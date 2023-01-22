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

// Tasks

module.exports = router;

/*

  // Add song to Spotify account queue periodically (Purpose: Reduces number of API requests)
  setInterval(() => {
    if (buffer.length < 1 || !adminStatus.activePlaying) {
      return;
    }
    const next = buffer.shift();
    console.log('Next: ' + next);
    spotifyApi.addToQueue(next.uri).then(() => {
      console.log('Added song to Spotify')
    }, (err) => {
      console.log(err)
    })
  }, 5000);

  // Update queue 
  setInterval(() => {
    if (queue.length < 1 || !adminStatus.activePlaying) {
      // Empty queue
      return;
    }
    if (Object.keys(adminStatus.playbackState).length != 0 && queue[0].uri == adminStatus.playbackState.item.uri){
      const popped = queue.shift();
      console.log('Removed: ' + popped + 'from top of queue');
    }

  }, 1000);


  return router;
}
*/
