import React, { useState } from 'react';
import { Container} from '@mui/material';

function HowToUse() {
  

  return (
    <div style={{ minHeight: "100vh", width: "80%", maxWidth: "100%" }}>
      <Container style={{ fontFamily:"'DM Sans', sans-serif" , marginTop:window.innerHeight*.045,marginLeft:window.innerWidth*.01, 
        fontSize: window.innerWidth *.021,fontWeight: "1000", color:"#3d435a"}}>How to use
      <div 
        style={{border: '.25vh solid #e0e4f2',
        marginTop: window.innerHeight*.025, borderRadius: window.innerHeight*.015, 
         flexDirection:"row",fontWeight: "bold",
        height: "23vh",  backgroundColor:"#ffffff",   
        width:window.innerWidth*.7775}}>

          
          <div style = {{display:"flex"}}>
        <div style = {{marginTop: window.innerHeight*0.014,marginLeft: window.innerWidth*0.014,color: "#3d435a"}}>
          <div style = {{fontSize: window.innerWidth*0.0145,color:"#496fff"}}>
                How to find songs
                </div>
                <div style = {{fontSize: window.innerWidth*0.0105,width: "33vw",}}>
                  
                  In the search bar, type in a song or artist. Then, hit enter to see results. *To ensure playlist diversity, we've disabled album searches to avoid others adding an entire album.
                </div>
                  </div> 
                  
                  
                   <img  style={{marginTop:'-.075vh',marginLeft: '7.5vw',height: '22.6vh', width: 22.6 * 1.436/0.543  + 'vh', objectFit: "contain" }}
                      objectFit="cover"  src="htf.png" />
                        </div>
                </div>
                
  

        <div 
        style={{border: '.25vh solid #e0e4f2',
        marginTop: window.innerHeight*.02, borderRadius: window.innerHeight*.015, 
        display:"flex", flexDirection:"row",fontWeight: "bold",
        height: "23vh",  backgroundColor:"#ffffff",   color: "#3d435a",
        width:window.innerWidth*.7775}}>


<div style = {{display:"flex"}}>
<div style = {{marginTop: window.innerHeight*0.014,marginLeft: window.innerWidth*0.014,color: "#3d435a"}}>
          <div style = {{fontSize: window.innerWidth*0.0145,color:"#496fff"}}>
                How to queue songs
                </div>
                <div style = {{fontSize: window.innerWidth*0.0105, width: "33vw"}}>
                 On the right to a song, click on the plus icon. A check mark will show a successful queue.
                </div>
                
                </div>
                <img  style={{marginTop:'-.03vh',marginLeft: '7.5vw',height: '22.5vh', width: 22.5 * 1.435/0.541  + 'vh', objectFit: "contain" }}
                      objectFit="cover"  src="htq.png" />
                </div>
        </div>

        <div 
        style={{border: '.25vh solid #e0e4f2',
        marginTop: window.innerHeight*.02, borderRadius: window.innerHeight*.015, 
        display:"flex", flexDirection:"row",fontWeight: "bold",
        minHeight: "23vh", backgroundColor:"#ffffff",   color: "#3d435a",
        width:window.innerWidth*.7775}}>

<div style = {{marginTop: window.innerHeight*0.014,marginLeft: window.innerWidth*0.014,color: "#3d435a",fontSize: window.innerWidth*0.0105,}}>
          <div style = {{fontSize: window.innerWidth*0.0145,color:"#496fff"}}>
                FAQ
                </div>
                <div style = {{marginBottom: '-.7vh'}}>
                 Why can't I add a song to the playlist?
                </div>
                <div style = {{marginBottom: '-.7vh'}}>
                Some reasons why you might not be able to add a song:
                </div>
                <div style = {{marginLeft: '1vw',marginBottom: '-.7vh'}}>
                • The song is already in the playlist.
                </div>
                <div style = {{marginLeft: '1vw',marginBottom: '-.7vh'}}>
                • The song is too explicit.
                </div>
                <div style = {{marginLeft: '1vw',marginBottom: '-.7vh'}}>
                • The song was frequently played and temporarily disabled to ensure playlist diversity.
                </div>
                <div style = {{marginLeft: '1vw',marginBottom: '-.7vh'}}>
                • The song is too low tempo during after hours and might make others sleepy.
                </div>
           
                
                </div>
        
      
        </div>
        </Container>
    </div>
  );
}

export default HowToUse;
