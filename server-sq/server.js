// Modules
const express = require("express");
const http = require('http');
const io = require('socket.io');
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
const app = express();
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

  // API
const clientId = process.env.CLIENT_ID, clientSecret = process.env.CLIENT_SECRET;
const spotifyApi = new SpotifyWebApi({clientId: clientId, clientSecret: clientSecret, redirectUri: process.env.SITE_URL + '/auth'});
const hostStatus = { adminSet : false, activePlaying : false, accessToken : '', playbackState : {} };

app.use('/host', host(spotifyApi, hostStatus));
app.use('/queue', queue(spotifyApi, hostStatus));
app.use('/playback', playback(spotifyApi, hostStatus));
app.use('/search', search(spotifyApi, hostStatus));

// Open to port
app.listen(process.env.PORT || 3001, () => {
  console.log('Beachmuse API Active');
});
