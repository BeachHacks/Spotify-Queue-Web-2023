const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const queue = require('./routes/queue')
// const SpotifyWebApi = SpotifyWebApi
// app.use(express.json()); // converts data into json between front and back 
// app.use(express.static('./sq-ui/src')); // connects back to front
app.use(cors())
app.use(bodyParser.json())

var clientId = 'dfe14fe582f44c358b2e05ded123ee70', clientSecret = 'e09034ca3fb346ccaa929bb1559a9571';
const spotifyApi = new SpotifyWebApi({clientId: clientId, clientSecret: clientSecret});

/*
app.post('/login', (req,res) => {
  const code = req.body.code

  const spotifyApi = new SpotifyWebApi({
    redirectUri:'http://localhost:3000',
    clientId:'dfe14fe582f44c358b2e05ded123ee70',
    clientSecret:'e09034ca3fb346ccaa929bb1559a9571'
  })

  spotifyApi.authorizationCodeGrant(code).then(data =>{
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  })
  .catch(()=>{
    res.sendStatus(400);
  })
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri:'http://localhost:3000',
    clientId:'dfe14fe582f44c358b2e05ded123ee70', 
    clientSecret:'e09034ca3fb346ccaa929bb1559a9571',
    refreshToken, 
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        eccessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})
*/

app.post('/searchTracks', function(req, res){
  //spotifyApi.setAccessToken(req.body.accessToken)
  spotifyApi.searchTracks(req.body.searchString).then(
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
