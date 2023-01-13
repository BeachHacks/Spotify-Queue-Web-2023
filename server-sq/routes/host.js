const express = require("express");
const router = express.Router();

module.exports = function(spotifyApi, hostStatus) {

  router.post('/hostLogin', (req,res) => {
    const code = req.body.code
    spotifyApi.authorizationCodeGrant(code).then(
      function(data) {
        hostStatus.accessToken = data.body['access_token']
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        hostStatus.adminSet = true; //Flag verifying token set (Concept in case we need to add more adminstrative features from client)
        console.log('Host set')
      },
      function(err) {
        hostStatus.adminSet = false;
        console.log('Error logging in host: ', err);
      })
      .catch(() => {
        res.sendStatus(400);
      })
    res.send('Done')
  })

  router.get('/hostStatus', (req, res) => {
    res.json(hostStatus);
  })

  router.get('/token', (req, res) => {
    res.send(hostStatus.accessToken)
  })

  //refresh token every 30 minutes
  setInterval(() => {
    spotifyApi.refreshAccessToken().then((data) => {
      console.log('Access token refreshed')
      hostStatus.accessToken = data.body['access_token']
      spotifyApi.setAccessToken(data.body['access_token']);
    }, (err) => {
      console.log('Could not refresh access token', err);
      hostStatus.adminSet = false;
    }
    )}, 1800000);

  return router;
}
