const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const queue = require('./routes/queue')
const playback = require('./routes/playback')
app.use(cors())
app.use(bodyParser.json())

const clientId = '4199d61d3f61411f83d09ecdbb6cd5c0', clientSecret = '135bf044717d4bd698cdd788feaadf07';
const spotifyApi = new SpotifyWebApi({clientId: clientId, clientSecret: clientSecret, redirectUri: 'http://localhost:3000/auth'});
const adminStatus = { adminSet : false, activePlaying : false, accessToken : '', playbackState : {} };

app.post('/searchTracks', function(req, res){
  const results = {
    tracks : {},
    features : {},
  }
  res.setHeader('Content-Type', 'application/json');
  console.log('Search Query', req.body.searchString);
  spotifyApi.searchTracks(req.body.searchString,req.body.params).then(
    function(data) {
      results.tracks = data.body;
      return data.body;
    }).then(
      function(searchResults){
        const idArr = [];
        //get id array from search
        for(let i = 0; i < searchResults.tracks.items.length; i++)
          idArr.push(searchResults.tracks.items[i].uri.replace('spotify:track:', ''))
        return spotifyApi.getAudioFeaturesForTracks(idArr);
      }).then(function(data){
        results.features = data.body
        res.json(results); 
      })
    .catch(function(err) {
      console.error(err);
    })
})

app.post('/adminLogin', (req,res) => {
  const code = req.body.code
  spotifyApi.authorizationCodeGrant(code).then(
    function(data) {
      adminStatus.accessToken = data.body['access_token']
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      adminStatus.adminSet = true; //Flag verifying token set (Concept in case we need to add more adminstrative features from client)
      console.log('Host set')
    },
    function(err) {
      adminStatus.adminSet = false;
      console.log('Error logging in host: ', err);
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
