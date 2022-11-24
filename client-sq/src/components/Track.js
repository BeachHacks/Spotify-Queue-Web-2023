// Component for showing track details
import React from "react"
import axios from 'axios';

export default function Track({ track, clickable }) {
    let gray = ""
    if(!track.passFilter)
      gray = " GRAY OUT (filter) "
    if(track.explicit)
      gray = " GRAY OUT (explicit) "
    
    function handleAdd() {
      if (!track.explicit && clickable && track.passFilter) axios.post("http://localhost:3001/queue/add", {
            title: track.title,
            artist: track.artist,
            albumUrl: track.albumUrl,
            uri: track.uri,
            passFilter: track.passFilter,
            explicit: track.explicit
          })
          .then(res => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          }); 
      else {
        if(track.explicit)
        console.log('Explicit song will not be added to queue')
        else
        console.log('Song does not pass filter requirements (Your song is boring zzZ)')
            
     }
   }

    return (
        <div className="d-flex m-2 align-items-center" style={{ cursor: "pointer"}} onClick={handleAdd}>
            <img src={track.albumUrl} alt={track.title} style={{height : "64px", width: "64px"}} />
            <div className="m1-3">
              
                <div>{track.title}<span className="text-muted">{gray}</span></div>
                <div className="text-muted">{track.artist}</div>
            
            </div>
        </div>
    )
    
}