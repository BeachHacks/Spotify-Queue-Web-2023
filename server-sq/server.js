const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const queue = require('./routes/queue')
app.use(cors())
app.use(bodyParser.json())

var clientId = 'dfe14fe582f44c358b2e05ded123ee70', clientSecret = 'e09034ca3fb346ccaa929bb1559a9571';
const spotifyApi = new SpotifyWebApi({clientId: clientId, clientSecret: clientSecret});


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

// REQUIRES UPDATE: to be called set on < 60 minute interval
// Setup Procedures
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving the access token', err);
  }
)


app.use('/queue', queue(spotifyApi));

// Open to port
app.listen(3001);
