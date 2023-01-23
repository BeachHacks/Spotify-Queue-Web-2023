const express = require("express");
const router = express.Router()

let socket = null;
let session = null;

// Middleware
router.use((req, res, next) => {
  session = req.app.get('session');
  socket = req.app.get('io');
  next();
})

// Routes
router.get('/', (req, res) => {
  res.send(session.queue)
})

router.post('/add', (req, res) => {
  const added = session.addToQueue(req.body); 
  if (added) {
    socket.emit('queueAdd', req.body);
  }
  added ? res.send("Added to queue") : res.send("Failed to add song")
})


module.exports = router;
