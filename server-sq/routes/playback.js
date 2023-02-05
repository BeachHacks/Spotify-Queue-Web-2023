const express = require("express");
const router = express.Router()

module.exports = function(socket, session) {

  router.get('/', (req, res) => {
    res.send('playback routing check')
  })

  router.get('/history', (req, res) => {
    res.json(session.history)
  })

  router.get('/playState', (req, res) => {
    if (!session.status.host || !session.playback.device.is_active) res.send('Host not active');
    else {
      const playState = session.playback;
      res.json({
        title: !(playState.item.name)?"":playState.item.name,
        artist: !(playState.item.artists[0].name)?"":playState.item.artists[0].name,
        albumImage: !(playState.item.album)?"https://cdn.discordapp.com/attachments/216598078315167744/1070887586278678538/image_30.png":playState.item.album.images,
        progress: !(playState.progress_ms)?0:playState.progress_ms,
        duration: !(playState.item.duration_ms)?0:playState.item.duration_ms,
        spotifyUrl: !(playState.item.external_urls.spotify)?"":playState.item.external_urls.spotify
      });
    }
  })

  // Retrieve playback state every 1 seconds and update history
  setInterval(() => {
    if (!session.status.host) { return; }
    session.spotify.getMyCurrentPlaybackState().then((data) => {
      if (Object.keys(data.body).length != 0){
        if (Object.keys(session.playback).length != 0 && data.body?.item?.uri != session.playback.item.uri) {
          const smallestAlbumImage = !(data.body.item.album)?"https://cdn.discordapp.com/attachments/216598078315167744/1070887586278678538/image_30.png"
          :
          data.body.item.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            data.body.item.album.images[0]
          )
          const newHistoryItem = {
            title: data.body.item.name,
            artist: data.body.item.artists[0].name,
            albumUrl: smallestAlbumImage.url,
            albumName: data.body.item.album.name,
            songDuration: data.body.item.duration,
            uri: data.body.item.uri,
            explicit: data.body.item.explicit, 
            filter: true,
            spotifyUrl: data.body.item.external_urls.spotify
          }
          session.addToHistory(newHistoryItem)
          console.log("Added to history")
          socket.emit('updateHistory', newHistoryItem);
          socket.emit('queuePop', 0);
        }
        else { //Debugging Purposes
        }

        session.playback = data.body; 
        session.active = session.playback.device.is_active 
        const playState = session.playback;
        const playClient = {
          title: !(playState.item.name)?"a":playState.item.name,
          artist: !(playState.item.artists[0].name)?"":playState.item.artists[0].name,
          albumImage: !(playState.item.album)?"https://cdn.discordapp.com/attachments/216598078315167744/1070887586278678538/image_30.png":playState.item.album.images,
          progress: !(playState.progress_ms)?0:playState.progress_ms,
          duration: !(playState.item.duration_ms)?0:playState.item.duration_ms,
          spotifyUrl: !(playState.item.external_urls.spotify)?"":playState.item.external_urls.spotify
        }
        socket.emit('playback', playClient);
      } 
    }, (err) => {
      console.log('Could not retrieve playback state successfully', err);
    }
    )}, 1000);

  return router;
}

