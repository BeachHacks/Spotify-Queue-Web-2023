// Component for showing track details
import React from "react"
import axios from 'axios';
import { Button, TableCell, TableRow } from '@mui/material';

export default function Track({ track, filter, clickable }) {
  
    let unqueueable = false
    
    if(!filter)
      unqueueable = true
    if(track.explicit)
      unqueueable = true
    
    function handleAdd() {
      if (!track.explicit && clickable && filter) axios.post("http://localhost:3001/queue/add", {
            title: track.title,
            artist: track.artist,
            albumUrl: track.albumUrl,
            albumName: track.albumName,
            songDuration: track.songDuration,
            uri: track.uri,
            passFilter: track.passFilter,
            explicit: filter
          })
          .then(res => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          }); 
   }
  
   function secondsToMinutes(milliSeconds){
      let seconds = parseFloat((milliSeconds/1000) % 60).toFixed(0)
      let minutes = Math.floor((milliSeconds/1000)/60)
      if (seconds < 10){
        return minutes.toString() + ":0" + seconds.toString() 
      }
      return minutes.toString() + ":" + seconds.toString() 
   }
    return (
        <>
            <TableRow hover={true}>

              {/* Album Artwork  */}
              <TableCell style={{ width: 50 }} align="left">
                <img src={track.albumUrl} alt={track.title} style={{height : "64px", width: "64px"}} />
              </TableCell>

              {/* Title and Artist  */}
              <TableCell style={{ width: 400, fontFamily:"ui-rounded"}} align="left">
                <div style={{ fontWeight : "bold", fontSize : "120%"}}>
                  {track.title}
                </div>
                <div>
                  {track.artist}
                </div>
              </TableCell>

              <TableCell style={{ width: 400, fontFamily:"ui-rounded"}} align="left">
              <div style={{fontSize : "small"}}>
                  {track.albumName}
                </div>
                
              </TableCell>

              {/* Button Add to Queue */}
              <TableCell align="right">
              {
                 !unqueueable && clickable? 
                 <Button onClick={handleAdd} variant="contained" color="success">+</Button>
                 : clickable ? <Button variant="outlined" disabled>+</Button> : null
              }
              </TableCell>
            </TableRow>
        </>
        
    )
}