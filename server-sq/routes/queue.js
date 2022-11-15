const express = require("express");
const router = express.Router()

module.exports = function(spotifyApi) {
    var queue = []; // Will eventually translate to playback queue.

    async function filter(trackUri) {
        let res = await spotifyApi.getAudioFeaturesForTrack(trackUri)
        let features = res.body;
        console.log(res.body);
        //Parse Features - REQUIRES UPDATE
        if (features.energy <= 0.45 || features.instrumentalness > 0.70) {
            return false;
        }
        return true;
    }

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
        //console.log(req.body);
        filter(req.body.uri.replace('spotify:track:', '')) ? queue.push(req.body): () => {res.send("Does not meet filter requirements")};
        res.send("Added to queue");
    })

    return router;
}
