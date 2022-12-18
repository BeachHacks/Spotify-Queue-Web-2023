const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const queue = require('./routes/queue')
const playback = require('./routes/playback')
app.use(cors())
app.use(bodyParser.json())

var clientId = 'db55ce79bd574c94aca99e831e39d6c9', clientSecret = 'b07d5cc57b5d4afc8b29032e60cffee9';
const spotifyApi = new SpotifyWebApi({clientId: clientId, clientSecret: clientSecret, redirectUri: 'http://localhost:3000/auth'});
let adminStatus = { adminSet : false, activePlaying : false, accessToken : '', playbackState : {} };

app.post('/searchTracks', function(req, res){
  spotifyApi.searchTracks(req.body.searchString,req.body.params).then(
    function(data) {
        res.send(data);
    },
    function(err) {
        console.error(err);
    }
    )
})

app.post('/getAudioFeaturesForTracks', function(req, res){
  spotifyApi.getAudioFeaturesForTracks(req.body.idArr).then(
    function(data) {
        res.send(data);
    },
    function(err) {
        console.error(err);
    }
    )
})

app.post('/adminLogin', (req,res) => {

  const code = req.body.code
  console.log(code)

  spotifyApi.authorizationCodeGrant(code).then(
    function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);
    
    adminStatus.accessToken = data.body['access_token']
    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    adminStatus.adminSet = true; //Flag verifying token set (Concept in case we need to add more adminstrative features from client)
  },
  function(err) {
    console.log('Something went wrong!', err);
  })
  .catch(() => {
    res.sendStatus(400);
  })
  res.send('Done')
})

// Can be useful
app.get('/adminStatus', (req, res) => {
  res.json(adminStatus);
})

app.get('/token', (req, res) => {
  res.send(adminStatus.accessToken)
})

//refresh token every 30 minutes
setInterval(() => {
  spotifyApi.refreshAccessToken().then((data) => {
    console.log('Access token refreshed')
    adminStatus.accessToken = data.body['access_token']
    spotifyApi.setAccessToken(data.body['access_token']);
    }, (err) => {
    console.log('Could not refresh access token', err);
    adminStatus.adminSet = false;
    }
  )}, 1800000);

app.use('/queue', queue(spotifyApi, adminStatus));
app.use('/playback', playback(spotifyApi, adminStatus));

// Open to port
app.listen(3001);
