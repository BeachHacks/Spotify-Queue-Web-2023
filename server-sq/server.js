// Modules
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require('cors');
const bodyParser = require('body-parser');

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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Socket Setup

// API
const clientId = process.env.CLIENT_ID, clientSecret = process.env.CLIENT_SECRET;
const spotifyApi = new SpotifyWebApi({clientId: clientId, clientSecret: clientSecret, redirectUri: process.env.SITE_URL + '/auth'});
const hostStatus = { adminSet : false, activePlaying : false, accessToken : '', playbackState : {} };

app.use('/host', host(spotifyApi, hostStatus));
app.use('/queue', queue(io, spotifyApi, hostStatus));
app.use('/playback', playback(io, spotifyApi, hostStatus));
app.use('/search', search(spotifyApi, hostStatus));

// Open to port
server.listen(process.env.PORT || 3001, () => {
  console.log('Beachmuse API Active');
});

// Socket Handlers
io.on('connection', (socket) => {
  socket.emit('id', socket.id);
  console.log(socket.id + ' connected');
  socket.on('disconnect', (reason) => {
  })
});

