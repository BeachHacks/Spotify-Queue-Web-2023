/* eslint-disable eqeqeq */
  // Component for showing track details
import React from "react"
import axios from 'axios';
import { TableCell, TableHead, TableRow } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { IconButton } from '@mui/material';
import { green } from '@mui/material/colors';
import { style } from "@mui/system";

export default function Track({ track, clickable, num }) {

  let unqueueable = false

  if(!track.filter)
    unqueueable = true
  if(track.explicit)
    unqueueable = true

  function handleAdd() {

    const queueRequest = () => {
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
          localStorage.setItem('time-queued', JSON.stringify(new Date().getTime()))
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        }); 
    }

    /* Limiting unique user queueing to 1 minute intervals. 
      * NOTE: This method uses clients local storage. 
      * Users can go out of their way to manipulate local storage and queue again. 
      * To resolve this, we would need to update the backend to store IPs
      */
      const interval = 60000; // Allowed interval in milliseconds
    let lastQueued = localStorage.getItem('time-queued'); 
    if(!lastQueued){
      queueRequest();
    }
    else {
      let time = new Date().getTime();
      let check = Math.abs(lastQueued - time)
      if (check < interval){ //1-minute interval
        console.log('Wait to add to queue again');
      } else {
        queueRequest();
      }
    }
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
    <TableRow  hover={true} >
    {clickable==false?<TableCell style={{ fontSize: window.innerWidth*0.009, fontWeight : "bold",fontFamily:"DM Sans",color: "#6d7285", 

    }}>{num+2}</TableCell> 
      :""}

    {/* image  */}
    {clickable==false? <TableCell style={{ width: window.innerWidth*0.01 }} align="left">
        <img src={track.albumUrl} alt={track.title} style={{height : window.innerHeight*0.05, width:window.innerHeight*0.05}} />
        </TableCell> :<TableCell style={{ width: window.innerWidth*0.01 }} align="left">
        <img src={track.albumUrl} alt={track.title} style={{height : window.innerHeight*0.065, width: window.innerHeight*0.065}} />
        </TableCell>   }

    <div  style={{ marginLeft: -window.innerWidth*0.007}}>
    {/* Title and Artist  */}
    {clickable==false? <TableCell style={{ width: window.innerWidth*0.3, fontFamily:"DM Sans", color:"#3d435a"}} align="left">
        <div style={{ fontWeight : "bold", fontSize: window.innerWidth*0.009, letterSpacing: -window.innerWidth*0.00015}}>
        {track.title}
        </div>
        <div style={{ fontWeight : 300, color: "#6d7285", fontSize: window.innerWidth*0.009, letterSpacing: -window.innerWidth*0.00015}}>
        {track.artist}
        </div>
        </TableCell> : 
        <TableCell style={{ width: window.innerWidth*0.3, fontFamily:"DM Sans", color:"#3d435a", letterSpacing: -window.innerWidth*0.00015}} align="left">
        <div style={{ fontWeight : "bold", fontSize : window.innerWidth*0.01}}>
        {track.title}
        </div>
        <div style={{ fontWeight : "bold", color: "#6d7285", fontSize: window.innerWidth*0.0095, letterSpacing: -window.innerWidth*0.00015}}>
        {track.artist}
        </div>
        </TableCell>}
    </div>



    {/* Button Add to Queue */}
    <TableCell align="right">
    {
      !unqueueable && clickable? 
      <IconButton onClick={handleAdd} style={{  marginRight: -window.innerWidth*0.008}} >
      <AddCircleOutlineRoundedIcon  sx={{  fontSize: window.innerWidth*0.022, color: "#1976d2"}}/>
      </IconButton>
      : clickable ? 
      <IconButton variant="outlined" disabled  style={{  marginRight: -window.innerWidth*0.008}}>
      <AddCircleOutlineRoundedIcon   sx={{ fontSize:window.innerWidth*0.022, }}/>
      </IconButton> : null
    }  
    </TableCell>
    </TableRow>
    </>

  )
}
