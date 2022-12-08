const express = require("express");
const router = express.Router()

module.exports = function(spotifyApi) {
    var queue = []; 
    
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
        queue.push(req.body) 
        spotifyApi.addToQueue(req.body.uri);
        res.send("added song to queue.")
    })

    return router;
}
