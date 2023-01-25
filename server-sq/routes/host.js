const express = require("express");
const router = express.Router();

module.exports = function(session) {

  router.post('/login', (req,res) => {
    const code = req.body.code
    const authenticationStatus = session.authenticate(code);
    authenticationStatus.then((data) => {
      res.sendStatus(data);
    })
  })

  router.get('/status', (req, res) => {
    res.json(session.status);
  })

  router.get('/token', (req, res) => {
    res.send(session.accessToken)
  })

  //refresh token every 30 minutes
  setInterval(() => {
    session.refreshToken();
  }, 1800000);

  return router;
}
