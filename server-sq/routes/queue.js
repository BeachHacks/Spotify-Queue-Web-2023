const express = require("express");
const router = express.Router()

module.exports = function(spotifyApi, adminStatus) {
  let queue = []; 
  let buffer = [];

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
    if (buffer.length < 1) {
      console.log('Buffer empty');
      return;
    }
    let next = buffer.shift();
    console.log('Next: ' + next);
    spotifyApi.addToQueue(next.uri).then(() => {
      console.log('Added song to Spotify')
    }, (err) => {
      console.log(err)
    })
  }, 5000);

  // Update queue 
  setInterval(() => {
    if (queue.length < 1) {
      // Empty queue
      return;
    }
    if (Object.keys(adminStatus.playbackState).length != 0 && queue[0].title == adminStatus.playbackState.item.name){
      let popped = queue.shift();
      console.log('Removed: ' + popped + 'from top of queue');
    }

  }, 3000);


  return router;
}
