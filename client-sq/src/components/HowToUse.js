import React, { useState } from 'react';
import { Container} from '@mui/material';

function HowToUse() {
  

  return (
    <div style={{ minHeight: "100vh", width: "80%", maxWidth: "100%" }}>
      <Container style={{ fontFamily:"'DM Sans', sans-serif" , marginTop:100*.045+ 'vh',marginLeft:100*.01+ 'vw', 
        fontSize: 100*.021+ 'vw',fontWeight: "1000", color:"#3d435a"}}>How to use
      <div 
        style={{border: '.25vh solid #e0e4f2',
        marginTop: 100*.025 + 'vh', borderRadius: 100*.015+ 'vh', 
         flexDirection:"row",fontWeight: "bold",
        height: "23vh",  backgroundColor:"#ffffff",   
        width:100*.7775 + 'vw'}}>

           
          <div style = {{display:"flex"}}>
        <div style = {{marginTop: 100*0.014+ 'vh',marginLeft: 100*0.014+ 'vw',color: "#3d435a"}}>
          <div style = {{fontSize: 100*2.1*0.0125 + 'vh',color:"#496fff"}}>
                How to find songs
                </div>
                <div style = {{fontWeight: 500,fontSize: 100*2.1*0.009 + 'vh',width: "33vw",}}>
                  
                  In the search bar, type in a song or artist. Then, hit enter to see results. *To ensure playlist diversity, we've disabled album searches to avoid others adding an entire album.
                </div>
                  </div> 
                  
                  
                   <img  style={{marginTop:'-0.3vh',marginLeft: '7.5vw',height: '22.85vh', width: 22.85 * 612/247  + 'vh', objectFit: "contain" }}
                      objectFit="cover"  src="htf.png" />
                        </div>
                </div>
                
  

        <div 
        style={{border: '.25vh solid #e0e4f2',
        marginTop: 100*.02+ 'vh', borderRadius: 100*.015+ 'vh', 
        display:"flex", flexDirection:"row",fontWeight: "bold",
        height: "23vh",  backgroundColor:"#ffffff",   color: "#3d435a",
        width:100*.7775 + 'vw'}}>


<div style = {{display:"flex"}}>
<div style = {{marginTop: 100*0.014+ 'vh',marginLeft: 100*0.014+ 'vw',color: "#3d435a"}}>
          <div style = {{fontSize: 100*2.1*0.0125 + 'vh',color:"#496fff"}}>
                How to queue songs
                </div>
                <div style = {{fontWeight: 500,fontSize: 100*2.1*0.009 + 'vh', width: "33vw"}}>
                 On the right to a song, click on the plus icon. A check mark will show a successful queue.
                </div>
                
                </div>
                <img  style={{marginTop:'-.03vh',marginLeft: '7.5vw',height: '22.6vh', width: 22.6 * 612/244  + 'vh', objectFit: "contain" }}
                      objectFit="cover"  src="htq.png" />
                </div>
        </div>

        <div 
        style={{border: '.25vh solid #e0e4f2',
        marginTop: 100*.02+ 'vh', borderRadius: 100*.015+ 'vh', 
        display:"flex", flexDirection:"row",fontWeight: "bold",
        minHeight: "23vh", backgroundColor:"#ffffff",   color: "#3d435a",
        width:100*.7775 + 'vw'}}>

<div style = {{marginTop: 100*0.014+ 'vh',marginLeft: 100*0.014+ 'vw',color: "#3d435a",fontWeight: 500,fontSize: 100*2.1*0.009 + 'vh',}}>
          <div style = {{fontWeight: 700,fontSize: 100*2.1*0.0125 + 'vh',color:"#496fff"}}>
                FAQ
                </div>
                <div style = {{fontWeight: 700,marginBottom: '-.5vh'}}>
                 Why can't I add a song to the playlist?
                </div>
                <div style = {{marginBottom: '-.5vh'}}>
                Some reasons why you might not be able to add a song:
                </div>
                <div style = {{marginLeft: '1vw',marginBottom: '-.5vh'}}>
                • The song is already in the playlist.
                </div>
                <div style = {{marginLeft: '1vw',marginBottom: '-.5vh'}}>
                • The song is too explicit.
                </div>
                <div style = {{marginLeft: '1vw',marginBottom: '-.5vh'}}>
                • The song was frequently played and temporarily disabled to ensure playlist diversity.
                </div>
                <div style = {{marginLeft: '1vw',marginBottom: '-.5vh'}}>
                • The song is too low tempo during after hours and might make others sleepy.
                </div>
           
                
                </div>
        
      
        </div>
        </Container>
    </div>
  );
}

export default HowToUse;
