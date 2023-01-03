/* eslint-disable eqeqeq */
// Component for showing track details
import React from "react"
import axios from 'axios';
import { TableCell, TableHead, TableRow } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { IconButton } from '@mui/material';
import { green } from '@mui/material/colors';

export default function Track({ track, clickable, num }) {

    let unqueueable = false
    
    if(!track.filter)
      unqueueable = true
    if(track.explicit)
      unqueueable = true
    
    function handleAdd() {
      if (!track.explicit && clickable && track.filter) axios.post("http://localhost:3001/queue/add", {
            title: track.title,
            artist: track.artist,
            albumUrl: track.albumUrl,
            albumName: track.albumName,
            songDuration: track.songDuration,
            uri: track.uri,
            explicit: track.explicit


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
            <TableRow  hover={true}  >
            {clickable==false?<TableCell style={{ fontSize: "120%", fontWeight : "bold",fontFamily:"DM Sans", color:"#3d435a"}}>{num+2}</TableCell> :""}
              {/* Album Artwork  */}
              <TableCell style={{ width: 50 }} align="left">
                <img src={track.albumUrl} alt={track.title} style={{height : "64px", width: "64px"}} />
              </TableCell>

              {/* Title and Artist  */}
              <TableCell style={{ width: 400, fontFamily:"DM Sans", color:"#3d435a"}} align="left">
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
                    <AddCircleOutlineRoundedIcon   sx={{  fontSize: "160%", color: "#1976d2"}}/>
                 </IconButton>
                 : clickable ? 
                 <IconButton variant="outlined" disabled>
                     <AddCircleOutlineRoundedIcon   sx={{ fontSize:"160%"}}/>
                 </IconButton> : null
              }  
              </TableCell>
            </TableRow>
        </>
        
    )
}