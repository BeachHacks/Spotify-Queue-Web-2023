// Component for showing track details
import React from "react"
import axios from 'axios';
import { TableCell, TableRow } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { IconButton } from '@mui/material';

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
            <TableRow  
             hover={true} >
            <div  style={{width: '.9vw', marginLeft: -window.innerWidth*0.007}}></div>

            {clickable==false?
            <TableCell style={{ padding: "2.25vh .45vw",fontSize: window.innerHeight*0.018, fontWeight : "bold",fontFamily:"DM Sans",color: "#6d7285", 
            
          }}>{num+2}</TableCell> 
            :""}

              
              {/* image  */}
              {clickable==false? <TableCell style={{ padding: ".7vh .9vw",width: window.innerWidth*0.01 }} align="left">
                <img src={track.albumUrl} alt={track.title} style={{height : window.innerHeight*0.05, width:window.innerHeight*0.05}} />
              </TableCell> :<TableCell style={{ padding: ".75vh .9vw",width: window.innerWidth*0.01 }} align="left">
                <img src={track.albumUrl} alt={track.title} style={{height : window.innerHeight*0.065, width: window.innerHeight*0.065}} />
              </TableCell>   }
           


              <div  style={{ marginLeft: -window.innerWidth*0.007, alignItems: "center", align: "center"}}>
              {/* Title and Artist  */}
              {clickable==false? <TableCell style={{ padding: ".7vh .9vw",width: window.innerWidth*0.3, fontFamily:"DM Sans", color:"#3d435a"}} align="left">
                <div style={{ fontWeight : "bold", fontSize: window.innerHeight*0.018, letterSpacing: -window.innerWidth*0.00015}}>
                  {track.title}
                </div>
                <div style={{ fontWeight : 300, color: "#6d7285", fontSize: window.innerHeight*0.015, letterSpacing: -window.innerWidth*0.00015}}>
                  {track.artist}
                </div>
              </TableCell> : 
              <TableCell style={{ padding: ".75vh .9vw",width: window.innerWidth*0.3, fontFamily:"DM Sans", color:"#3d435a", letterSpacing: -window.innerWidth*0.00015}} align="left">
                <div style={{ fontWeight : "bold", fontSize : window.innerHeight*0.02}}>
                  {track.title}
                </div>
                <div style={{ fontWeight : "bold", color: "#6d7285", fontSize: window.innerHeight*0.018, letterSpacing: -window.innerWidth*0.00015}}>
                  {track.artist}
                </div>
              </TableCell>}
              </div>
              
          

              {/* Button Add to Queue */}
              <TableCell style={{ padding: ".75vh .9vw"}} align="right">
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