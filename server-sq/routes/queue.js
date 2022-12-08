const express = require("express");
const router = express.Router()

module.exports = function(spotifyApi, adminStatus) {
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
        adminStatus ? spotifyApi.addToQueue(req.body.uri) : res.send("Failed to add song")
        res.send("added song to queue.")
    })

    return router;
}
