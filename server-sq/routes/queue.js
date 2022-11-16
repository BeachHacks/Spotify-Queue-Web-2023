const express = require("express");
const router = express.Router()

module.exports = function(spotifyApi) {
    var queue = []; // Will eventually translate to playback queue.
    
    async function filter(trackUri) {
        let res = await spotifyApi.getAudioFeaturesForTrack(trackUri).then()
        let features = res.body;
        //console.log(features);
        //Parse Features - REQUIRES UPDATE
        //updated based on piano, classical music, and other slow/sleepy song track features (update if needed)
        if (features.energy <= 0.3 || 
            features.loudness <= -17 ||
            features.acousticness >= .8 ||
            features.instrumentalness >= 0.60 ||
            features.valence <= 0.15 ||
            features.tempo <= 80 ) {
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
        let filterPromise = filter(req.body.uri.replace('spotify:track:', ''))
        //console.log("SHOULD BE promise PENDING", filterPromise) // Promise { <pending> }
        console.log(req.body);
        filterPromise.then(result=> {
            if(result){
                queue.push(req.body)
                console.log("This song was added to queue")
                }  // "boolean for filter"
            else{
                console.log("This song does not meet the queue requirements")
            }
        })
        res.send("Check server for filter status");
    })

    return router;

}


