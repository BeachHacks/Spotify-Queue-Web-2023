// Component for showing track details
import { useState, React } from "react"
import axios from 'axios';
import { Slide, Fade, Zoom, TableCell, TableRow } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { IconButton } from '@mui/material';

const Track = ({ track, clickable, num, theme }) => {
  const [clicked, setClicked] = useState(false)
  const [disable, setDisabled] = useState(false)
  const [fade, setSlide] = useState(true)
  let unqueueable = false

  if (!track.filter)
    unqueueable = true
  if (track.explicit)
    unqueueable = true


  function handleAdd() {
    if (!track.explicit && clickable && track.filter) axios.post(process.env.REACT_APP_API_URL + "/queue/add", {
      title: track.title,
      artist: track.artist,
      albumUrl: track.albumUrl,
      albumName: track.albumName,
      songDuration: track.songDuration,
      uri: track.uri,
      explicit: track.explicit,
      spotifyUrl: track.spotifyUrl

    })
      .then(res => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      });

    setClicked(true)
    setDisabled(true)
    setTimeout(() => {
      setClicked(false)
    }, 3000)
    setTimeout(() => {
      setSlide(false)
    }, 2700)
  }

  function secondsToMinutes(milliSeconds) {
    let seconds = parseFloat((milliSeconds / 1000) % 60).toFixed(0)
    let minutes = Math.floor((milliSeconds / 1000) / 60)
    if (seconds < 10) {
      return minutes.toString() + ":0" + seconds.toString()
    }
    return minutes.toString() + ":" + seconds.toString()
  }

    return (
      
        <>  
        {clickable==false?
        <Fade key = {num && track.title} in={true} timeout={1000}><TableRow  
             hover={true} > 
              <div  style={{width: '.9vw', marginLeft: -100*0.007+ 'vw'}}></div>
             <TableCell style={{ width: '2.15vw',padding: "2.08vh .55vw",fontSize: 100*0.018+ 'vh', fontWeight : 500,fontFamily:"DM Sans",color: "#6d7285" }}>{num+1}
             </TableCell>
          
          <TableCell style={{ padding: ".7vh 1.1vw",width: 100*0.01+ 'vw' }} align="left">
                
                <a href={track.spotifyUrl}><img class = "bigger" src={track.albumUrl} alt={track.title} style={{height : 100*0.02625+ 'vw', width:100*0.02625+ 'vw'}} /></a>
                
              </TableCell> 
              <div  style={{ marginLeft: -100*0.007+ 'vw', alignItems: "center", align: "center"}}>

              <TableCell style={{ padding: "1.3vh .8vw",width: 100*0.3+ 'vw', fontFamily:"DM Sans", color: theme.palette.text.primary}} align="left">
                <div style={{ marginBottom: -100*0.005+ 'vh', fontWeight : "bold", fontSize: 100*0.018+ 'vh'}}>
                  {track.title}
                </div>
                <div style={{ opacity: '75%',fontWeight : 500, color: theme.palette.text.primary, fontSize: 100*0.015+ 'vh'}}>
                  {track.artist}
                </div>
              </TableCell> 
              </div>


           </TableRow> 
           </Fade>: 
        <Slide direction = 'down' in={true} timeout={500}>
          
            <TableRow  
             hover={true}  >  
             
             
            <div  style={{width: '.9vw', marginLeft: -100*0.007+ 'vw'}}></div>
          
              {/* image  */}
                
              <TableCell style={{ padding: ".75vh .9vw",width: 100*0.01+ 'vw' }} align="left">
              
                <a href={track.spotifyUrl}><img class = "bigger" src={track.albumUrl} alt={track.title} style={{height : 100*0.034+ 'vw', width: 100*0.034+ 'vw'}} /></a>
             
              </TableCell> 
            
              <div  style={{ marginLeft: -100*0.007+ 'vw', alignItems: "center", align: "center"}}>
              {/* Title and Artist  */}
              
              <TableCell style={{ padding: "1.4vh .6vw",width: 100*0.3+ 'vw', fontFamily:"DM Sans", color:theme.palette.text.primary}} align="left">
                <div style={{ fontWeight : "bold", fontSize : 100*0.02+ 'vh'}}>
                  {track.title}
                </div>
                <div style={{ opacity: '75%',fontWeight : 500, color: theme.palette.text.primary, fontSize: 100*0.018+ 'vh'}}>
                  {track.artist}
                </div>
              </TableCell>
             
              </div>
              
          

              {/* Button Add to Queue */}
              <TableCell style={{padding: "0vh", paddingRight: "1vw"}} align="right">
              {
                 !unqueueable && clickable? 
                
                 <IconButton onClick={handleAdd} disabled = {disable} disableRipple disableTouchRipple style={{  marginRight: -100*0.008+ 'vw'}} >
                 {
                 !clicked?
                 !disable?
                 
                 <AddCircleOutlineRoundedIcon  sx={{  fontSize: '2.2vw', color: theme.palette.primary.main}}/>
                
                
                  :

                  <Zoom in={disable} timeout={300}>
                  <AddCircleOutlineRoundedIcon  sx={{opacity:"10%", color: theme.palette.common.disButton, fontSize: '2.2vw'}}/>
                  </Zoom>
                
                  :
                  <Zoom in={fade} timeout={300}>
                 <CheckCircleRoundedIcon sx={{  fontSize: '2.2vw', color: theme.palette.primary.main }}/>
                 </Zoom>
                 }
                 </IconButton>
                
                 : clickable ? 
               
                 <IconButton variant="outlined" disabled style={{ color: theme.palette.common.disButton, marginRight: -100*0.008+ 'vw'}}>
                     <AddCircleOutlineRoundedIcon   sx={{ fontSize:100*0.022+ 'vw' }}/>
                 </IconButton>: null
              }  
              </TableCell> 
            </TableRow>
            </Slide>
            }
        </>
       
        
    )

}
export default Track;
