/* eslint-disable eqeqeq */
// Component for showing track details
import React from "react"
import axios from 'axios';
import { TableCell, TableHead, TableRow } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import { green } from '@mui/material/colors';

export default function Track({ track, filter, clickable, num }) {

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
            //explicit: filter
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
            {clickable==false?<TableCell style={{fontWeight : "bold",fontFamily:"ui-rounded", color:"#3d435a"}}>{num+2}</TableCell> :""}
              {/* Album Artwork  */}
              <TableCell style={{ width: 50 }} align="left">
                <img src={track.albumUrl} alt={track.title} style={{height : "64px", width: "64px", borderRadius:5}} />
              </TableCell>

              {/* Title and Artist  */}
              <TableCell style={{ width: 400, fontFamily:"ui-rounded", color:"#3d435a"}} align="left">
                <div style={{ fontWeight : "bold", fontSize : "120%"}}>
                  {track.title}
                </div>
                <div>
                  {track.artist}
                </div>
              </TableCell>

              {/* Button Add to Queue */}
              <TableCell align="right">
              {
                 !unqueueable && clickable? 
                 <IconButton onClick={handleAdd} >
                    <AddCircleIcon sx={{ fontSize: 35, color: green[500] }}/>
                 </IconButton>
                 : clickable ? 
                 <IconButton variant="outlined" disabled>
                     <AddCircleIcon sx={{ fontSize: 35 }}/>
                 </IconButton> : null
              }  
              </TableCell>
            </TableRow>
        </>
        
    )
}