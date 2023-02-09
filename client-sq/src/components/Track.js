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
    const queueRequest = () => {
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
          console.log(res.data);
          if(res.data === 'PASS'){
            localStorage.setItem('time-queued', JSON.stringify(new Date().getTime()));
            setClicked(true)
            setDisabled(true)
            setTimeout(() => {
              setClicked(false)
            }, 3000)
            setTimeout(() => {
              setSlide(false)
            }, 2700)
            
          }
          else {
            console.log('Failed to add to queue');
            setClicked(true)

            setDisabled(true)

            setTimeout(() => {
              setClicked(false)
            }, 3000)
            setTimeout(() => {
              setSlide(false)
            }, 2700)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    }

    /* Limiting clients to queueing to 1 minute intervals. Method: localStorage flags
      * Not strict. */
      const interval = 60000; // Allowed interval in milliseconds
    let lastQueued = localStorage.getItem('time-queued');
    if(!lastQueued){
      queueRequest();
    }
    else {
      let time = new Date().getTime();
      let check = Math.abs(lastQueued - time)
      if (check < interval) {
        console.log('Wait to add to queue again');
      } else {
        queueRequest();
      }
    }
    setSlide(true)
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
              > 
              <div  style={{width: '.9vw', marginLeft: -100*0.007+ 'vw'}}></div>
             <TableCell style={{ width: '2.15vw',padding: "2.08vh .55vw",fontSize: 100*0.010+ 'vw', fontWeight : 500,fontFamily:"DM Sans", opacity: '75%',color: theme.palette.text.primary }}>{num+1}
             </TableCell>
          
          <TableCell style={{ padding: ".7vh 1.6vw",width: 100*0.01+ 'vw' }} align="left">
                
                <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer"><img class = "bigger" src={track.albumUrl} alt={track.title} style={{height : 100*0.02625+ 'vw', width:"100*0.02625+ 'vw'"}} /></a>
                
              </TableCell> 
              <div  style={{ marginLeft: -100*0.007+ 'vw', alignItems: "center", align: "center"}}>
            

              <TableCell  class = "bigger2" style={{ transformOrigin: "left", padding: "1.2vh .3vw",width: 100*0.3+ 'vw', fontFamily:"DM Sans", color: theme.palette.text.primary}} align="left">
                <div style={{ marginBottom: -100*0.002+ 'vh', fontWeight : "bold", fontSize: 100*0.010+ 'vw', width: "50vw"}}>
                {track.title.length>70 ? track.title.substring(0,67)+ "...": track.title}
                </div>
                <div style={{ opacity: '75%',fontWeight : 300, color: theme.palette.text.primary, fontSize: 100*0.008+ 'vw'}}>
                  {track.artist}
                </div>
              </TableCell> 
              </div>


           </TableRow> 
           </Fade>: 
        <Slide direction = 'down' in={true} timeout={500}>
          
            <TableRow   
               >  
             
             
            <div  style={{width: '.9vw', marginLeft: -100*0.007+ 'vw'}}></div>
          
              {/* image  */}
                
              <TableCell style={{ padding: ".75vh  1.1vw",width: 100*0.01+ 'vw' }} align="left">
              
                <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer"><img class = "bigger" src={track.albumUrl} alt={track.title} style={{height : 100*0.034+ 'vw', width: 100*0.034+ 'vw'}} /></a>
             
              </TableCell> 
            
              <div  style={{ marginLeft: -100*0.007+ 'vw', alignItems: "center", align: "center"}}>
              {/* Title and Artist  */}
              
              <TableCell   class = "bigger2" style={{ transformOrigin: "left", padding: "1.3vh .6vw",width: 100*0.3+ 'vw', fontFamily:"DM Sans", color:theme.palette.text.primary}} align="left">
                <div style={{fontWeight : "bold", fontSize : 100*0.011+ 'vw'}}>
                  {track.title.length>35 ? track.title.substring(0,32)+ "...": track.title}
                </div>
                <div style={{ opacity: '75%',fontWeight : 500, color: theme.palette.text.primary, fontSize: 100*0.010+ 'vw'}}>
                  {track.artist}
                </div>
              </TableCell>
             
              </div>
              
          

              {/* Button Add to Queue */}
              <TableCell style={{padding: "0vh", paddingRight: "0vw"}} align="right">
              {
                 !unqueueable && clickable? 
                
                 <IconButton onClick={handleAdd} disabled = {disable} disableRipple disableTouchRipple style={{ }} >
                  {
                  !clicked?
                    !disable?
                      <AddCircleOutlineRoundedIcon className = "button"  sx={{fontSize: '2.2vw'}}/>
                      :
                        <Zoom in={disable} timeout={300}>
                          <AddCircleOutlineRoundedIcon  sx={{ color: theme.palette.common.disButton, fontSize: '2.2vw'}}/>
                        </Zoom>
                  
                      :
                        <Zoom  in={fade} timeout={300}>
                          <CheckCircleRoundedIcon sx={{  fontSize: '2.2vw', color: theme.palette.primary.main }}/>
                        </Zoom>
                    }
                  </IconButton>
                
                  :
                    clickable ? 
                      <IconButton variant="outlined" disabled style={{ color: theme.palette.common.disButton}}>
                          <AddCircleOutlineRoundedIcon   sx={{ fontSize:100*0.022+ 'vw' }}/>
                      </IconButton>
                        : 
                          null
              }  
              </TableCell> 
            </TableRow>
            </Slide>
            }
        </>
       
        
    )

}
export default Track;
