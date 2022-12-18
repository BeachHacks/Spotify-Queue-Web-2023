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
        let added = true
        if (adminStatus.activePlaying) {
            spotifyApi.addToQueue(req.body.uri).then(() => {
                console.log(req.body)
            }, (err) => {
                console.log(err)
            })
            queue.push(req.body)
        }
        added ? res.send("Added to queue") : res.send("Failed to add song")
        //console.log("Added Flag: ", added)
    })

    return router;
}
