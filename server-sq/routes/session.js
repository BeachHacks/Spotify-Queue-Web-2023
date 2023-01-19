const express = require('express')
const router = express.Router()

let session = null;

// Middleware
router.use((req, res, next) => {
  session = req.app.get('session');
  console.log(req.body);
  next();
})

// Routes
router.get('/', (req, res) => {
  res.send('queue routing check')
})

router.get('/show', (req, res) => {
  res.json(queue)
})

router.post('/add', (req, res) => {
  session.addToQueue(req.body);
  console.log(session.queue);
  let added = false 
  added = true;
  added ? res.send("Added to queue") : res.send("Failed to add song")
})

module.exports = router;
