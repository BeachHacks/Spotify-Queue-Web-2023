/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal, Grid, Button, Fade, Stack } from '@mui/material';
import '../styles/App.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: ".75vh",
    boxShadow: 24,
    width: "78%",
    height: "74%",
    fontFamily: "DM Sans",
    backgroundColor: "#F6F8FF",
    outline: "none",
    border: 'none',
    color: "#3C435C"

}

function LandingPage() {

    const [open, setOpen] = useState(true);
    const [mainPageFadeIn, setMainPageFadeIn] = useState(true)
    const [clickNum, setClickNum] = useState(1);

    const handleClick = () => {
        setClickNum(1 + clickNum);
        console.log(clickNum)
    }

    return (
        <>
            <Modal open={open}>
                <Grid
                    container
                    sx={[style, mainPageFadeIn === true ? { padding: '4vh' } : { padding: 0 }]}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    {mainPageFadeIn === true ?
                        <Fade in={mainPageFadeIn} timeout={3000}>

                            <Grid style={{width: "100%",
                                        height: "100%",
                                        marginTop: "1vh",
                                        
                                         }}>
                                <div style={{ textAlign: 'center',fontSize: '3.3vw', fontWeight: "bold", color: "#3C435C",marginTop:'5vh' }}>
                                    Hey <a style={{ color: "#496fff", }}>BeachHacks!👋</a>
                                </div>
                                
                                <div style={{ textAlign: 'center',fontWeight: 500,fontSize: '1.85vw', height: '8vh', color: "#3C435C",marginTop:'1vh' }}>Ready to add your vibe to the party with BeachMuse?</div>
                                <img src="BeachMuseGraphics1.png"
                                        style={{
                                           
                                            height: .037 * 379 + 'vw',
                                            width: .037 * 740 + 'vw',
                                            display: "block",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            
                                        }} />
                               <div style={{textAlign: 'center',marginTop:'5.25vh'}}>
                                    <button

                                        style={{
                                            fontWeight: 500,
                                            color: "white",
                                            backgroundColor: "#496fff",
                                            width: '12.5vw',
                                            height: '7vh',
                                            fontSize: '1.25vw',
                                            borderRadius: '.75vh',
                                            border: 'none'

                                        }}
                                        onClick={() => {setOpen(false); localStorage.setItem('visited', 'true')}}
                                    >
                                        Ready to vibe!

                                    </button>
                                    <button
                                        style={{
                                            fontWeight: 500,
                                            backgroundColor: "#EBEEFF",
                                            color: "#496fff",
                                            width: '12.5vw',
                                            height: '7vh',
                                            fontSize: '1.25vw',
                                            borderRadius: '.75vh',
                                            border: 'none',
                                            marginLeft: '1.1vw'
                                        }}
                                        onClick={() => { setMainPageFadeIn(false); console.log(clickNum) }}
                                    >
                                        How to use
                                        
                                    </button>
                                    
                               </div>

                            </Grid>
                        </Fade> : <></>}

                    {mainPageFadeIn === false && clickNum === 1 ?
                        <Fade in={!mainPageFadeIn} timeout={3000}>

                            <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                                <div style={{
                                    width: "49.5%", height: "100%",
                                    paddingTop: "20.625vh", paddingLeft: "6.7vw",
                                }}>
                                    <div style={{ color: "#496fff", fontWeight: "bold", fontSize: "2.08vw" }}>How to find songs</div>
                                
                                    <div style={{height: '8vh',marginTop: "0.1vh",fontWeight: 500, color: "#3C435C", fontSize: "1.67vw" ,lineHeight:'4vh'}}> In the search bar, type in a song or artist. Then, hit enter to see results.</div>
                                

                                    <div style={{ marginTop: "9.5vh", display: "inline-flex" }}>
                                        <button
                                        
                                            style={{
                                                
                                                fontWeight: 500,
                                                color: "white",
                                                backgroundColor: "#496fff",
                                                width: '12.5vw',
                                                height: '6.9vh',
                                                fontSize: '1.25vw',
                                                borderRadius: '1.4vh',
                                                border: 'none',
                                                
                                            }}
                                            onClick={() => { handleClick(); console.log(clickNum) }}
                                        > Next </button>
                                        <img src={"Slider1.png"}
                                            style={{
                                                marginLeft: "18.2vw",
                                                marginTop: "19.7vh",
                                                width: .052 * 62 + 'vw',
                                                height: .052 * 16 + 'vw'
                                                
                                            }}></img>
                                    </div>
                                </div>
                                <div>
                                    <img src={"LandingPage1.png"}
                                        style={{
                                            marginLeft: '4.5vw',
                                            marginTop: "5.65vh",
                                            width: .0925 * 612 + 'vh',
                                            height: .0925* 738 + 'vh',
                                            
                                        }} />
                                </div>
                            </div>
                        </Fade> : <></>}
                    {/* 2220797; 2252854 */}
                    {mainPageFadeIn === false && clickNum === 2 ?
                    <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                    <div style={{
                        width: "49.5%", height: "100%",
                        paddingTop: "20.625vh", paddingLeft: "6.7vw",
                    }}>
                        <div style={{ color: "#496fff", fontWeight: "bold", fontSize: "2.08vw" }}>How to queue songs</div>
                    
                        <div style={{height: '8vh',marginTop: "0.1vh",fontWeight: 500, color: "#3C435C", fontSize: "1.67vw" ,lineHeight:'4vh'}}>
                        On the right to a song, click on the plus icon. A check mark will show a successful queue.</div>
                    

                        <div style={{ marginTop: "9.5vh", display: "inline-flex" }}>
                            <button
                            
                                style={{
                                    
                                    fontWeight: 500,
                                    color: "white",
                                    backgroundColor: "#496fff",
                                    width: '12.5vw',
                                    height: '6.9vh',
                                    fontSize: '1.25vw',
                                    borderRadius: '1.4vh',
                                    border: 'none',
                                    
                                }}
                                onClick={() => { handleClick(); console.log(clickNum) }}
                            > Next </button>
                            <img src={"Slider2.png"}
                                style={{
                                    marginLeft: "18.2vw",
                                    marginTop: "19.7vh",
                                    width: .052 * 62 + 'vw',
                                    height: .052 * 16 + 'vw'
                                    
                                }}></img>
                        </div>
                    </div>
                    <div>
                        <img src={"LandingPage2.png"}
                            style={{
                                marginLeft: '4.5vw',
                                marginTop: "5.65vh",
                                width: .0925 * 612 + 'vh',
                                height: .0925* 738 + 'vh',
                                
                            }} />
                    </div>
                </div>
                        
                        : <></>}

                    {mainPageFadeIn === false && clickNum === 3 ?
                    <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                    <div style={{
                        width: "49.5%", height: "100%",
                        paddingTop: "20.625vh", paddingLeft: "6.7vw",
                    }}>
                        <div style={{ color: "#496fff", fontWeight: "bold", fontSize: "2.08vw" }}>Other things to know</div>
                    
                        <div style={{height: '8vh',marginTop: "0.1vh",fontWeight: 500, color: "#3C435C", fontSize: "1.67vw" ,lineHeight:'4vh'}}>
                        In order to create the best playlist for BeachHacks, we recommend following these tips.</div>
                    

                        <div style={{ marginTop: "9.5vh", display: "inline-flex" }}>
                            <button
                            
                                style={{
                                    
                                    fontWeight: 500,
                                    color: "white",
                                    backgroundColor: "#496fff",
                                    width: '12.5vw',
                                    height: '6.9vh',
                                    fontSize: '1.25vw',
                                    borderRadius: '1.4vh',
                                    border: 'none',
                                    
                                }}
                                onClick={() => { setOpen(false); setMainPageFadeIn(true); setClickNum(1); localStorage.setItem('visited', 'true');}}
                            > Ready to vibe! </button>
                            <img src={"Slider3.png"}
                                style={{
                                    marginLeft: "18.2vw",
                                    marginTop: "19.7vh",
                                    width: .052 * 62 + 'vw',
                                    height: .052 * 16 + 'vw'
                                    
                                }}></img>
                        </div>
                    </div>
                    <div style = {{margin: "auto", paddingLeft: '1.025vw', paddingBottom: '5vh'}}>

                       <Stack direction="column" spacing={'3vh'}>
                                    <Grid
                                        container
                                        sx={{ backgroundColor: "white", boxShadow: "0vw .5vh 1vw 0.25vw #e0e4f2", borderRadius: '1.3vh', height: "10.5vh", width: "28.75vw", textAlign: "center",
                                         border: '.25vh solid #e0e4f2' }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <div style={{fontWeight: 500, fontSize: '2.6vh', marginTop: "0vh",lineHeight:'3.25vh' }}>To keep it professional, avoid<br />explicit songs.</div>
                                    </Grid>
                                    <Grid
                                        container
                                        sx={{ backgroundColor: "white",boxShadow: "0vw .5vh 1vw 0.25vw #e0e4f2", borderRadius: '1.3vh', height: "10.5vh", width: "28.75vw", textAlign: "center",
                                        border: '.25vh solid #e0e4f2'  }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <div style={{ fontWeight: 500,fontSize: '2.6vh', marginTop: "0vh" ,lineHeight:'3.25vh'}}>To keep the playlist diverse,<br />avoid repeating songs.</div>
                                    </Grid>
                                    <Grid
                                        container
                                        sx={{ backgroundColor: "white",boxShadow: "0vw .5vh 1vw 0.25vw #e0e4f2",borderRadius: '1.3vh', height: "10.5vh", width: "28.75vw", textAlign: "center",
                                        border: '.25vh solid #e0e4f2'  }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <div style={{fontWeight: 500, fontSize: '2.6vh', marginTop: "0vh",lineHeight:'3.25vh' }}>Rule 3 here</div>
                                    </Grid>
                                </Stack>
                    </div>
                </div>
                        : <></>}
                </Grid>
            </Modal>
        </>
    )
}
export default LandingPage

