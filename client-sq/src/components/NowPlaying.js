import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import ProgressBar from "./ProgressBar";
import { SocketContext } from "./App";
import { selectClasses, Slide, Zoom } from '@mui/material';

const NowPlaying = ({ theme }) => {

  const io = useContext(SocketContext);


  const [playbackState, setPlaybackState] = useState({
    albumImage: [{ url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg" }],
    artist: "",
    duration: 0,
    progress: 0,
    title: "Loading",
    spotifyUrl: ""
  });

  // Initialization
  useEffect(() => {

    // Socket Handlers
    io.on('playback', (data) => {
      setPlaybackState(data);
    })

    return () => {
      io.off('playback');
    }
  }, [])

  // Helper Functions
  const millisecondsToMinute = (millisec) => {
    var minutes = Math.floor((millisec / 1000) / 60)
    var seconds = (millisec / 1000) % 60
    if (Math.floor(seconds) >= 0 && Math.floor(seconds) < 10) {
      seconds = "0" + Math.floor(seconds)
    }
    else {
      seconds = Math.floor(seconds)
    }
    return minutes + ":" + seconds
  }

  return (

    <Zoom key={playbackState.title} in={(playbackState.duration / 1000) - (playbackState.progress / 1000) > 1} timeout={{ enter: 500, exit: 300 }} >
      <div style={{ display: "inline-flex", width: "100%" }}>
        <div>
          <a href={playbackState.spotifyUrl} target="_blank" rel="noopener noreferrer"><img class="bigger2" src={playbackState.albumImage[0].url}
            alt={"Album Image"}
            style={{ height: 100 * 0.104 + 'vw', width: 100 * 0.104 + 'vw', marginTop: 100 * 0.008 + 'vh' }} /> </a>
        </div>

        <div style={{ alignSelf: "flex-end", marginLeft: 100 * .016 + 'vw', width: "100%", marginBottom: -100 * 0.006 + 'vh' }}>
          {/* <Slide direction='left' key={playbackState.title} in={((playbackState.duration / 1000) - (playbackState.progress / 1000) > 1)} timeout={500}>
            <div style={{ color: theme.palette.text.primary, fontWeight: "1000", fontSize: 100 * 0.01657 + 'vw', marginBottom: -100 * 0.005 + 'vh' }}>{playbackState.title}</div>
          </Slide>
          <Slide direction='left' key={playbackState.artist} in={((playbackState.duration / 1000) - (playbackState.progress / 1000) > 1)} timeout={600}>
            <div style={{ color: theme.palette.text.primary, fontWeight: 500, fontSize: 100 * 0.0105 + 'vw', marginBottom: 100 * 0.019 + 'vh' }}>{playbackState.artist}</div>
          </Slide> */}

          <ProgressBar theme={theme} style={{ marginLeft: ".01vw" }} number={(playbackState.progress / playbackState.duration) * 100} />


          <Slide direction='left' key={playbackState.duration} in={((playbackState.duration / 1000) - (playbackState.progress / 1000) > 1)} timeout={700}>
            <div style={{ color: theme.palette.text.primary, fontWeight: "1000", fontSize: 100 * 0.0075 + 'vw', marginTop: 100 * 0.005 + 'vh' }}>{millisecondsToMinute(playbackState.progress)}<span style={{ float: "right" }} >{millisecondsToMinute(playbackState.duration)}</span></div>

          </Slide>



        </div>

      </div>
    </Zoom>
  )
}

export default NowPlaying;
