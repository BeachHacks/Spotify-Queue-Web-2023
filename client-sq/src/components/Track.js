// Component for showing track details
import {useState,React} from "react"
import axios from 'axios';
import {Slide, Fade,TableCell, TableRow } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { IconButton } from '@mui/material';

export default function Track({ track, clickable, num }) {
    const [clicked, setClicked] = useState(false)
    const [disable, setDisabled] = useState(false)
    const [fade, setSlide] = useState(true)
    let unqueueable = false
    
    if(!track.filter)
      unqueueable = true
    if(track.explicit)
      unqueueable = true
    
   
    function handleAdd() {
      if (!track.explicit && clickable && track.filter) axios.post(process.env.REACT_APP_API_URL + "/queue/add", {
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

          setClicked(true)
          setDisabled(true)
          setTimeout(() => {
            setClicked(false)
          }, 3000)
          setTimeout(() => {
            setSlide(false)
        }, 2500)
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
           
            {clickable==false?  <Fade in={true} timeout={500}> 
            <TableCell style={{ width: '2.15vw',padding: "2.08vh .55vw",fontSize: window.innerHeight*0.018, fontWeight : 500,fontFamily:"DM Sans",color: "#6d7285", 
            
          }}>{num+1}</TableCell>
              </Fade>:""}
        
              
              {/* image  */}
                
              {clickable==false?
               <TableCell style={{ padding: ".7vh 1.1vw",width: window.innerWidth*0.01 }} align="left">
                <Fade in={true} timeout={1000}>
                <img src={track.albumUrl} alt={track.title} style={{height : window.innerWidth*0.02625, width:window.innerWidth*0.02625}} />
                </Fade>
              </TableCell> :
            
              <TableCell style={{ padding: ".75vh .9vw",width: window.innerWidth*0.01 }} align="left">
                <Slide in={true} timeout={500}>
                <img src={track.albumUrl} alt={track.title} style={{height : window.innerWidth*0.034, width: window.innerWidth*0.034}} />
                </Slide>
              </TableCell> }
            
              

              <div  style={{ marginLeft: -window.innerWidth*0.007, alignItems: "center", align: "center"}}>
              {/* Title and Artist  */}
              
              {clickable==false?  <Fade in={true} timeout={1000}><TableCell style={{ padding: "1.3vh .8vw",width: window.innerWidth*0.3, fontFamily:"DM Sans", color:"#3d435a"}} align="left">
                <div style={{ marginBottom: -window.innerHeight*0.005, fontWeight : "bold", fontSize: window.innerHeight*0.018}}>
                  {track.title}
                </div>
                <div style={{ fontWeight : 400, color: "#6d7285", fontSize: window.innerHeight*0.015}}>
                  {track.artist}
                </div>
              </TableCell> 
              </Fade>: 
              <Slide in={true} timeout={500}>
              <TableCell style={{ padding: "1.4vh .6vw",width: window.innerWidth*0.3, fontFamily:"DM Sans", color:"#3d435a"}} align="left">
                <div style={{ fontWeight : "bold", fontSize : window.innerHeight*0.02}}>
                  {track.title}
                </div>
                <div style={{ fontWeight : 500, color: "#6d7285", fontSize: window.innerHeight*0.018}}>
                  {track.artist}
                </div>
              </TableCell></Slide>}
             
              </div>
              
          

              {/* Button Add to Queue */}
              <TableCell style={{padding: "0vh", paddingRight: "1vw"}} align="right">
              {
                 !unqueueable && clickable? 
                <Slide in='true' timeout={500}>
                 <IconButton onClick={handleAdd} disabled = {disable} disableRipple disableTouchRipple style={{  marginRight: -window.innerWidth*0.008}} >
                 {
                 !clicked?
                 !disable?
                 
                 <AddCircleOutlineRoundedIcon  sx={{  fontSize: '2.2vw', color: "#496fff"}}/>
                
                
                  :

                  <Fade in={disable} timeout={500}>
                  <AddCircleOutlineRoundedIcon  sx={{  fontSize: '2.2vw'}}/>
                  </Fade>
                
                  :
                  <Fade in={fade} timeout={500}>
                 <CheckCircleRoundedIcon sx={{  fontSize: '2.2vw', color: "#496fff"}}/>
                 </Fade>
                 }
                 </IconButton>
                 </Slide>
                 : clickable ? 
                 <Slide in='true' timeout={500}>
                 <IconButton variant="outlined" disabled style={{  marginRight: -window.innerWidth*0.008}}>
                     <AddCircleOutlineRoundedIcon   sx={{ fontSize:window.innerWidth*0.022, }}/>
                 </IconButton></Slide> : null
              }  
              </TableCell> 
            </TableRow>
        </>
       
        
    )

}
