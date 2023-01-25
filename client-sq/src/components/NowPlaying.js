import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import ProgressBar from "./ProgressBar";
import { SocketContext } from "./App";

function NowPlaying() {

  const io = useContext(SocketContext);

  const [playbackState, setPlaybackState] = useState({
    albumImage: [{ url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg" }],
    artist: "Loading",
    duration: 0,
    progress: 0,
    title: "Loading"
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
        <div style={{ display: "inline-flex", width: "100%"}}>
            <div>
                <img src={playbackState.albumImage[0].url}
                    alt={"Album Image"}
                    style={{ height: window.innerWidth * 0.104, width: window.innerWidth * 0.104, marginTop: window.innerHeight * 0.008 }} />
            </div>

    <div style={{ alignSelf: "flex-end", marginLeft: window.innerWidth * .016, width: "100%", marginBottom: -window.innerHeight * 0.006 }}>

                <div style={{ color: "#3d435a", fontWeight: "1000", fontSize: window.innerWidth * 0.01657, marginBottom: -window.innerHeight * 0.005 }}>{playbackState.title}</div>
                <div style={{ color: "#3d435a", fontWeight: 500, fontSize: window.innerWidth * 0.0105, marginBottom: window.innerHeight * 0.019 }}>{playbackState.artist}</div>
                <ProgressBar style={{marginLeft: ".01vw"}}number={(playbackState.progress / playbackState.duration) * 100} />
                <div style={{ color: "#3d435a", fontWeight: "1000", fontSize: window.innerWidth * 0.0075, marginTop: window.innerHeight * 0.005 }}>{millisecondsToMinute(playbackState.progress)}<span style={{ float: "right" }} >{millisecondsToMinute(playbackState.duration)}</span></div>


    </div>
    </div>
  )
}
export default NowPlaying;
