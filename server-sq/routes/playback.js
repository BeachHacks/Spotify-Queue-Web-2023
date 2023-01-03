const express = require("express");
const router = express.Router()

module.exports = function(spotifyApi, adminStatus) {
  var history = []; 

  router.get('/', (req, res) => {
    res.send('playback routing check')
  })

  router.get('/history', (req, res) => {
    res.json(history)
  })

  router.get('/playState', (req, res) => {
    if (!adminStatus.adminSet || !adminStatus.playbackState.device.is_active) res.send('Host not active');
    else {
      const playState = adminStatus.playbackState
      res.json({
        title: playState.item.name,
        artist: playState.item.artists[0].name,
        albumImage: playState.item.album.images,
        progress: playState.progress_ms,
        duration: playState.item.duration_ms,
      });
    }
  })

  // Retrieve playback state every 3 seconds and update history
  setInterval(() => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      //console.log('Retrieved playback state')
      //console.log(data.body) //Debugging Purposes
      if (Object.keys(data.body).length != 0){
        if (Object.keys(adminStatus.playbackState).length != 0 && data.body?.item?.uri != adminStatus.playbackState.item.uri) {
          const smallestAlbumImage = data.body.item.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            data.body.item.album.images[0]
          )
          history.push({
            title: data.body.item.name,
            artist: data.body.item.artists[0].name,
            albumUrl: smallestAlbumImage.url,
            albumName: data.body.item.album.name,
            songDuration: data.body.item.duration,
            uri: data.body.item.uri,
            passFilter: true,
          })
          console.log("Added to history")
        }
        else { //Debugging Purposes
          //console.log("Not added to history. Empty playback state.")
        }
        adminStatus.playbackState = data.body
        console.log(adminStatus.playbackState);
        adminStatus.activePlaying = adminStatus.playbackState.device.is_active
      } 
    }, (err) => {
      console.log('Could not retrieve playback state successfully', err);
    }
    )}, 1000);

  return router;
}

