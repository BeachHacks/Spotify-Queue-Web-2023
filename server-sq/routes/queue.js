const express = require("express");
const router = express.Router()

module.exports = function(spotifyApi, adminStatus) {
  const queue = []; 
  const buffer = [];

  router.get('/', (req, res) => {
    res.send('queue routing check')
  })

  router.get('/next', (req, res) => {
    res.json(queue[0])
  })

  router.get('/show', (req, res) => {
    res.json(queue)
  })

  router.post('/add', (req, res) => {
    let added = false 
    if (adminStatus.activePlaying) {
      queue.push(req.body)
      buffer.push(req.body)
      added = true
    }
    added ? res.send("Added to queue") : res.send("Failed to add song")
  })

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
