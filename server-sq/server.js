// Modules
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require('cors');
const bodyParser = require('body-parser');
const SessionManager = require('./models/SessionManager');

// Route Files
const host = require('./routes/host')
const search = require('./routes/search')
const queue = require('./routes/queue')
const playback = require('./routes/playback')

// Deployment Related Functionality
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Express Setup
app.use(bodyParser.json())
// CORS: Cross-Origin Resource Sharing
app.use(cors())
/*
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
*/
// Socket Setup

// API
const clientId = process.env.CLIENT_ID, clientSecret = process.env.CLIENT_SECRET;
const spotifyApi = new SpotifyWebApi({clientId: clientId, clientSecret: clientSecret, redirectUri: process.env.SITE_URL + '/auth'});
const hostStatus = { adminSet : false, activePlaying : false, accessToken : '', playbackState : {} };
const session = new SessionManager();

app.set('spotifyApi', spotifyApi);
app.set('hostStatus', hostStatus);
app.set('session', session);
app.set('io', io);

app.use('/host', host);
app.use('/search', search);
app.use('/queue', queue);
app.use('/playback', playback);

// Open to port
server.listen(process.env.PORT || 3001, () => {
  console.log('Beachmuse API Active');
});

// Socket Handlers
io.on('connection', (socket) => {
  socket.emit('id', socket.id);
  socket.on('disconnect', (reason) => {
  })
});

// Scheduled Tasks
// Refresh Token
setInterval(() => {
  session.refreshToken();
}, 1800000);

// Push to Spotify
setInterval(() => {
  if (session.buffer.length < 1 || !session.status.host) { return; }
  const next = session.buffer.shift();
  session.pushToSpotify(next).then(() => {
    console.log('Added song to Spotify')
  }, (err) => {
    console.log('Error occurred trying to add song to Spotify');
    console.log(err);
  }) 
}, 5000);

// Retrieve playback state every 3 seconds and update history
setInterval(() => {
  if (!session.status.host) { return; }
  session.spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //console.log('Retrieved playback state')
    //console.log(data.body) //Debugging Purposes
    if (Object.keys(data.body).length != 0){
      if (Object.keys(session.playback).length != 0 && data.body?.item?.uri != session.playback.item.uri) {
        const smallestAlbumImage = data.body.item.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          },
          data.body.item.album.images[0]
        )
        const newHistoryItem = {
          title: data.body.item.name,
          artist: data.body.item.artists[0].name,
          albumUrl: smallestAlbumImage.url,
          albumName: data.body.item.album.name,
          songDuration: data.body.item.duration,
          uri: data.body.item.uri,
          explicit: data.body.item.explicit, 
          filter: true,
        }
        session.addToHistory(newHistoryItem);
        console.log("Added to history")
        io.emit('updateHistory', newHistoryItem);
      }
      else { //Debugging Purposes
        //console.log("Not added to history. Empty playback state.")
      }

      session.playback = data.body
      //session.active(session.playback.device.is_active);
      const playState = session.playback;
      const playClient = {
        title: playState.item.name,
        artist: playState.item.artists[0].name,
        albumImage: playState.item.album.images,
        progress: playState.progress_ms,
        duration: playState.item.duration_ms,
      }
      io.emit('playback', playClient);
    } 
  }, (err) => {
    console.log('Could not retrieve playback state successfully', err);
  }
  )}, 1000);

// Update Queue
setInterval(() => {
  if (session.queue.length < 1) { return ; }
  if (Object.keys(session.playback).length != 0 && session.queue[0].uri == session.playback.item.uri){
    const popped = session.popQueue(); 
    //io.emit("queueSet", session.queue);
    io.emit("queueRemove", 0);
    console.log('Popped Queue');
  }
}, 1000);
