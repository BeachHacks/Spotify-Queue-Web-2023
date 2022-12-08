const express = require("express");
const router = express.Router()

module.exports = function(spotifyapi) {
    var history = []; 
    
    router.get('/', (req, res) => {
        res.send('playback routing check')
    })

    return router;
}

