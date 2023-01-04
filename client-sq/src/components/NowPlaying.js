import React, { useState, useEffect } from "react";
import axios from 'axios';
import ProgressBar from "./ProgressBar";

function NowPlaying(){



    const [playbackState, setPlaybackState] = useState({
        albumImage: [{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"}],
        artist: "Loading",
        duration: 0,
        progress: 0,
        title: "Loading"}
    )


    useEffect(() => {

        let ignore = false;
        async function getPlayState() {
            const result = await axios('http://localhost:3001/playback/playState')
            if (!ignore) setPlaybackState(result.data)
        }
        getPlayState()

    }, [playbackState])

    // const [timer, setTimer] = useState(playbackState.progress / 1000);
    // const id = useRef(null);
    // const clear = () => { window.clearInterval(id.current); };

    // useEffect(() => {
    //     id.current = window.setInterval(() => {
    //         setTimer((time) => time + 1);
    //     }, 1000);
    //     return () => clear();
    // }, []);

    // useEffect(() => {
    //     if (timer >= 101) {
    //         setTimer(0);
    //     }
    // }, [timer]);

    const millisecondsToMinute = (millisec) => {
        var minutes = Math.floor((millisec / 1000) / 60)
        var seconds = (millisec / 1000) % 60
        if(Math.floor(seconds)>=0 && Math.floor(seconds)<10){
            seconds = "0"+Math.floor(seconds)
        }
        else{
            seconds = Math.floor(seconds)
        }
        return minutes+":"+seconds
    }
    
    return(
            
            <div style={{ display: "inline-flex", width: "90%" }}>
                <div>
                    <img src={playbackState.albumImage[0].url}
                        alt={"Album Image"}
                        style={{ height: "150px", width: "150px" }}/>
                </div>

                <div style={{ alignSelf: "flex-end", marginLeft: 15, marginBottom: 10, width:"100%" }}>

                    <h3>{playbackState.title}</h3>
                    <h6>{playbackState.artist}</h6>
                    <ProgressBar number={(playbackState.progress/playbackState.duration)*100}/>
                    <div>{millisecondsToMinute(playbackState.progress)}/{millisecondsToMinute(playbackState.duration)}</div>

                </div>
            </div>
            
        

    )
}
export default NowPlaying;