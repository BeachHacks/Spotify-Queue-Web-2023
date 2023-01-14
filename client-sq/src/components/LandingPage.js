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
    borderRadius: 2,
    boxShadow: 24,
    width: "77.5%",
    height: "75%",
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
                                        margin: "5vw",
                                        //border: ".25vh solid #e0e4f2",
                                         }}>
                                <div style={{ fontSize: '5vw', fontWeight: "bold", color: "#3C435C",marginTop:'5vh' }}>
                                    Hey <a style={{ color: "#496fff", }}>BeachHacks!👋</a>
                                </div>
                                
                                <div style={{ fontWeight: 1000,fontSize: '2.5vw', height: '7vh', color: "#3C435C" }}>Ready to add your vibe to the party with <div style = {{marginTop:'-1vh'}}>BeachMuse?</div></div>
                                
                               
                                    <button

                                        style={{
                                            fontWeight: 1000,
                                            color: "white",
                                            backgroundColor: "#496fff",

                                            width: '15vw',
                                            height: '9vh',
                                            fontSize: '1.5vw',
                                            borderRadius: '.75vh',
                                            border: 'none'

                                        }}
                                        onClick={() => {setOpen(false); localStorage.setItem('visited', 'true')}}
                                    >
                                        Ready to vibe!

                                    </button>
                                    <button
                                        style={{
                                            fontWeight: 1000,
                                            backgroundColor: "#EBEEFF",
                                            color: "#496fff",
                                            width: '15vw',
                                            height: '9vh',
                                            fontSize: '1.5vw',
                                            borderRadius: '.75vh',
                                            border: 'none',
                                            marginLeft: '1vw'
                                        }}
                                        onClick={() => { setMainPageFadeIn(false); console.log(clickNum) }}
                                    >
                                        How to Use
                                    </button>
                                    <img src="BeachMuseGraphics.png"
                                        style={{
                                            marginTop: '3vh',
                                            marginLeft: '3vw',
                                            height: .052 * 290 + 'vw',
                                            width: .052 * 557 + 'vw'
                                        }} />
                               

                            </Grid>
                        </Fade> : <></>}

                    {mainPageFadeIn === false && clickNum === 1 ?
                        <Fade in={!mainPageFadeIn} timeout={3000}>

                            <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                                <div style={{
                                    width: "90%", height: "100%",
                                    paddingTop: "8vh", paddingLeft: "6vw",
                                }}>
                                    <h2 style={{ color: "#496fff", fontWeight: "bold", fontSize: "2.5vw" }}>How to find songs</h2>
                                    <br />
                                    <h3 style={{ color: "#3C435C", fontSize: "1.8vw" }}> In the search bar, type in a song or artist. Then, hit enter to see results.</h3>
                                    <br />

                                    <div style={{ display: "inline-flex" }}>
                                        <Button
                                            style={{
                                                color: "white",
                                                backgroundColor: "#496fff",
                                                width: "9vw",
                                                height: "7vh",

                                                borderRadius: '1vh',

                                                fontSize: "1vw",
                                            }}
                                            onClick={() => { handleClick(); console.log(clickNum) }}
                                        > Next </Button>
                                        <img src={"Slider1.png"}
                                            style={{
                                                marginLeft: "1vw",
                                                marginTop: "11%",
                                                width: "2.6vw",
                                                height: "1.35vh"
                                            }}></img>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        src={"LandingPage1.jpeg"}
                                        style={{
                                            paddingLeft: "8vw",
                                            paddingRight: "4vw",
                                            marginTop: "7vh",
                                            width: "41vw",
                                            height: "73vh"
                                        }} />
                                </div>
                            </div>
                        </Fade> : <></>}
                    {/* 2220797; 2252854 */}
                    {mainPageFadeIn === false && clickNum === 2 ?
                        <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                            <div style={{
                                width: "90%", height: "100%",
                                paddingTop: "8vh", paddingLeft: "6vw",
                            }}>
                                <h2 style={{ color: "#496fff", fontWeight: "bold", fontSize: "2.5vw" }}>How to queue songs</h2>
                                <br />
                                <h3 style={{ color: "#3C435C", fontSize: "1.8vw" }}> On the right to a song, click on the plus icon. A check mark will show a successful queue</h3>
                                <br />

                                <div style={{ display: "inline-flex" }}>
                                    <Button
                                        style={{
                                            color: "white",
                                            backgroundColor: "#496fff",
                                            width: "9vw",
                                            height: "7vh",

                                            borderRadius: '1vh',

                                            fontSize: "1vw",
                                        }}
                                        onClick={() => { handleClick(); console.log(clickNum) }}
                                    > Next </Button>
                                    <img src={"Slider2.png"}
                                        style={{
                                            marginLeft: "1vw",
                                            marginTop: "11%",
                                            width: "2.6vw",
                                            height: "1.35vh"
                                        }}></img>
                                </div>
                            </div>
                            <div>
                                <img
                                    src={"LandingPage2.png"}
                                    style={{
                                        paddingLeft: "8vw",
                                        paddingRight: "6vw",
                                        marginTop: "7vh",
                                        width: "41vw",
                                        height: "73vh"
                                    }} />
                            </div>
                        </div>
                        : <></>}

                    {mainPageFadeIn === false && clickNum === 3 ?
                        <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                            <div style={{
                                width: "90%", height: "100%",
                                paddingTop: "8vh", paddingLeft: "6vw",
                            }}>
                                <h2 style={{ color: "#496fff", fontWeight: "bold", fontSize: "2.5vw" }}>Other things to know</h2>
                                <br />
                                <h3 style={{ color: "#3C435C", fontSize: "1.8vw" }}> In order to create the best playlist for BeachHacks, we recommend following these tips.</h3>
                                <br />

                                <div style={{ display: "inline-flex" }}>
                                    <Button
                                        style={{
                                            color: "white",
                                            backgroundColor: "#496fff",
                                            width: "9vw",
                                            height: "7vh",

                                            borderRadius: '1vh',

                                            fontSize: "0.9vw",
                                        }}
                                        onClick={() => { setOpen(false); setMainPageFadeIn(true); setClickNum(1); localStorage.setItem('visited', 'true');}}
                                    > Ready to Vibe! </Button>
                                    <img src={"Slider3.png"}
                                        style={{
                                            marginLeft: "1vw",
                                            marginTop: "11%",
                                            width: "2.6vw",
                                            height: "1.35vh"
                                        }}></img>
                                </div>
                            </div>
                            <div
                                style={{
                                    paddingLeft: "8vw",
                                    paddingRight: "4vw",
                                    marginTop: "9vh",
                                    width: "40vw",
                                    height: "73vh",

                                }}>
                                <Stack direction="column" spacing={4}>
                                    <Grid
                                        container
                                        sx={{ boxShadow: "0vw 1vh 1vw 0.5vw #e0e4f2", borderRadius: 3, height: "10vh", width: "27vw", textAlign: "center", border: '.25vh solid #e0e4f2' }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <h2 style={{ fontSize: "1.5vw", marginTop: "2%" }}>To keep it professional, avoid<br />explicit songs.</h2>
                                    </Grid>
                                    <Grid
                                        container
                                        sx={{ boxShadow: "0vw 1vh 1vw 0.5vw #e0e4f2", borderRadius: 3, height: "10vh", width: "27vw", textAlign: "center" }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <h2 style={{ fontSize: "1.5vw", marginTop: "2%" }}>To keep the playlist diverse,<br />avoid repeating songs.</h2>
                                    </Grid>
                                    <Grid
                                        container
                                        sx={{ boxShadow: "0vw 1vh 1vw 0.5vw #e0e4f2", borderRadius: 3, height: "10vh", width: "27vw", textAlign: "center" }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <h2 style={{ fontSize: "1.5vw", marginTop: "2%" }}>Rule 3 here</h2>
                                    </Grid>
                                </Stack>
                            </div>
                        </div> : <></>}
                </Grid>
            </Modal>
        </>
    )
}
export default LandingPage
