const express = require("express");
const router = express.Router()

module.exports = function(socket, session) {

  router.get('/', (req, res) => {
    res.send('queue routing check')
  })

  router.get('/next', (req, res) => {
    res.json(session.queue[0])
  })

  router.get('/show', (req, res) => {
    res.json(session.queue)
  })

  router.post('/add', (req, res) => {
    let added = false 
    //if (session.status.active) {
      added = session.addToQueue(req.body);
      socket.emit('queueAdd', req.body);
    //}
    added ? res.send("Added to queue") : res.send("Failed to add song")
  })

  // Add song to Spotify account queue periodically (Purpose: Reduces number of API requests)
  setInterval(() => {
    if (session.buffer.length < 1) {
      return;
    }
    const next = session.buffer.shift();
    console.log('Next: ' + next);
    session.spotify.addToQueue(next).then(() => {
      console.log('Added song to Spotify')
    }, (err) => {
      console.log(err)
    })
  }, 5000);

  // Popping Queue 
  setInterval(() => {
    if (session.queue.length < 1) {
      // Empty queue
      return;
    }
    if (Object.keys(session.playback).length != 0 && session.queue[0].uri == session.playback.item.uri){
      const popped = session.popQueue();
      console.log('Removed: ' + popped + 'from top of queue');
    }

  }, 1000);


  return router;
}
