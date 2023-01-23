const express = require("express");
const router = express.Router()

let socket = null;
let session = null;

router.use((req, res, next) => {
  socket = req.app.get('io');
  session = req.app.get('session');
  next();
})

router.get('/', (req, res) => {
  res.send('playback routing check')
})

router.get('/history', (req, res) => {
  res.json(session.history)
})

router.get('/playState', (req, res) => {
  if (!session.status.host) { res.send('Host not active'); }
  else {
    const playState = session.playback;
    res.json({
      title: playState.item.name,
      artist: playState.item.artists[0].name,
      albumImage: playState.item.album.images,
      progress: playState.progress_ms,
      duration: playState.item.duration_ms,
    });
  }
})

module.exports = router;

