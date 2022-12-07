const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const queue = require('./routes/queue')
app.use(cors())
app.use(bodyParser.json())

var clientId = 'db55ce79bd574c94aca99e831e39d6c9', clientSecret = 'b07d5cc57b5d4afc8b29032e60cffee9';
const spotifyApi = new SpotifyWebApi({clientId: clientId, clientSecret: clientSecret, redirectUri: 'http://localhost:3000/auth'});
let adminDetails = { adminSet : false };

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

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    adminSet = true; //Flag verifying token set (Concept in case we need to add more adminstrative features from client)
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
  res.json(adminDetails);
})

//refresh token every 30 minutes
const interval = setInterval(() => {
  spotifyApi.refreshAccessToken().then((data) => {
    console.log('Access token refreshed')
    spotifyApi.setAccessToken(data.body['access_token']);
    }, (err) => {
    console.log('Could not refresh access token', err);
    }
  )}, (30)*(60)*1000
);

app.use('/queue', queue(spotifyApi));

// Open to port
app.listen(3001);
//spotifyApi.getMe();
