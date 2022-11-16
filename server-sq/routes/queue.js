const express = require("express");
const router = express.Router()
const SpotifyWebApi = require("spotify-web-api-node");

var queue = [];

router.get('/', (req, res) => {
    res.send('Queue routing check')
})

router.get('/next', (req, res) => {
    res.json(queue[0])
})

router.get('/show', (req, res) => {
    res.json(queue)
})

router.post('/add', (req, res) => {
    queue.push(req.body)
    res.json(queue);
})

module.exports = router