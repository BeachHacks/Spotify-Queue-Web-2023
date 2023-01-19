const express = require("express");
const router = express.Router();

let socket = null;
let session = null;

router.use((req, res, next) => {
  socket = req.app.get('io');
  session = req.app.get('session');
  next();
})

router.post('/login', (req,res) => {
  const code = req.body.code;
  const loginStatus = session.authenticate(code);
  loginStatus.then((data) => {
    res.sendStatus(data);
  })
});

router.get('/token', (req, res) => {
  res.send(session.token)
})

// 1800000

module.exports = router;
