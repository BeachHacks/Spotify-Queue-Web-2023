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
    width: "75%",
    height: "80%",
    fontFamily: "DM Sans",
    backgroundColor: "#F6F8FF"
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
                    sx={[style, mainPageFadeIn === true ? { padding: 4 } : { padding: 0 }]}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    {mainPageFadeIn === true ?
                        <Fade in={mainPageFadeIn} timeout={3000}>
                            <Grid style={{ margin: "2.5%", }}>
                                <h1 style={{ fontSize: window.innerWidth * 0.06, fontWeight: "bold", color: "#3C435C" }}>
                                    Hey <a style={{ color: "#496fff", }}>BeachHacks!👋</a>
                                </h1>
                                <br />
                                <h2 style={{ fontSize: window.innerWidth * 0.02, color: "#3C435C" }}>Ready to add your vibe to the party with<br />BeachMuse?</h2>
                                <br />
                                <Grid style={{
                                    margin: "2.5%",
                                    display: "inline-flex",
                                    marginLeft: 0,
                                    height: window.innerHeight * 0.07,
                                }} direction="row" alignItems="center" justifyContent="center">
                                    <Button
                                        style={{
                                            color: "white",
                                            backgroundColor: "#496fff",
                                            width: window.innerWidth * 0.1,
                                            fontSize: window.innerWidth * 0.01,
                                        }}
                                        onClick={() => (setOpen(false))}
                                    >
                                        Ready to vibe!
                                    </Button>
                                    <Button style={{
                                        marginLeft: window.innerWidth * 0.005,
                                        backgroundColor: "#EBEEFF",
                                        color: "#496fff",
                                        width: window.innerWidth * 0.1,
                                        fontSize: window.innerWidth * 0.01,
                                    }}
                                        onClick={() => { setMainPageFadeIn(false); console.log(clickNum) }}
                                    >
                                        How to Use
                                    </Button>
                                    <img src="BeachMuseGraphics.png" 
                                    style={{ marginTop: window.innerHeight*0.05, 
                                             marginLeft: window.innerWidth*0.05, 
                                             height: window.innerHeight * 0.3,
                                             width: window.innerWidth*0.3
                                             }}/>
                                </Grid>
                            </Grid>
                        </Fade> : <></>}

                    {mainPageFadeIn === false && clickNum === 1 ?
                        <Fade in={!mainPageFadeIn} timeout={3000}>

                            <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                                <div style={{
                                    width: "90%", height: "100%",
                                    paddingTop: window.innerHeight * 0.08, paddingLeft: window.innerWidth * 0.06,
                                }}>
                                    <h2 style={{ color: "#496fff", fontWeight: "bold", fontSize: window.innerWidth * 0.025 }}>How to find songs</h2>
                                    <br />
                                    <h3 style={{ color: "#3C435C", fontSize: window.innerWidth * 0.018 }}> In the search bar, type in a song or artist. Then, hit enter to see results.</h3>
                                    <br />

                                    <div style={{ display: "inline-flex" }}>
                                        <Button
                                            style={{
                                                color: "white",
                                                backgroundColor: "#496fff",
                                                width: window.innerWidth * 0.09,
                                                height: window.innerHeight * 0.07,
                                                borderRadius: 10,
                                                fontSize: window.innerWidth * 0.01,
                                            }}
                                            onClick={() => { handleClick(); console.log(clickNum) }}
                                        > Next </Button>
                                        <img src={"Slider1.png"}
                                            style={{
                                                marginLeft: window.innerWidth * 0.01,
                                                marginTop: "11%",
                                                width: window.innerWidth * 0.026,
                                                height: window.innerHeight * 0.0135
                                            }}></img>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        src={"LandingPage1.jpeg"}
                                        style={{
                                            paddingLeft: window.innerWidth * 0.08,
                                            paddingRight: window.innerWidth * 0.04,
                                            marginTop: window.innerHeight * 0.07,
                                            width: window.innerWidth * 0.41,
                                            height: window.innerHeight * 0.73
                                        }} />
                                </div>
                            </div>
                        </Fade> : <></>}

                    {mainPageFadeIn === false && clickNum === 2 ?
                        <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                            <div style={{
                                width: "90%", height: "100%",
                                paddingTop: window.innerHeight * 0.08, paddingLeft: window.innerWidth * 0.06,
                            }}>
                                <h2 style={{ color: "#496fff", fontWeight: "bold", fontSize: window.innerWidth * 0.025 }}>How to queue songs</h2>
                                <br />
                                <h3 style={{ color: "#3C435C", fontSize: window.innerWidth * 0.018 }}> On the right to a song, click on the plus icon. A check mark will show a successful queue</h3>
                                <br />

                                <div style={{ display: "inline-flex" }}>
                                    <Button
                                        style={{
                                            color: "white",
                                            backgroundColor: "#496fff",
                                            width: window.innerWidth * 0.09,
                                            height: window.innerHeight * 0.07,
                                            borderRadius: 10,
                                            fontSize: window.innerWidth * 0.01,
                                        }}
                                        onClick={() => { handleClick(); console.log(clickNum) }}
                                    > Next </Button>
                                    <img src={"Slider2.png"}
                                        style={{
                                            marginLeft: window.innerWidth * 0.01,
                                            marginTop: "11%",
                                            width: window.innerWidth * 0.026,
                                            height: window.innerHeight * 0.0135
                                        }}></img>
                                </div>
                            </div>
                            <div>
                                <img
                                    src={"LandingPage2.png"}
                                    style={{
                                        paddingLeft: window.innerWidth * 0.08,
                                        paddingRight: window.innerWidth * 0.06,
                                        marginTop: window.innerHeight * 0.07,
                                        width: window.innerWidth * 0.41,
                                        height: window.innerHeight * 0.73
                                    }} />
                            </div>
                        </div>
                        : <></>}

                    {mainPageFadeIn === false && clickNum === 3 ?
                        <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                            <div style={{
                                width: "90%", height: "100%",
                                paddingTop: window.innerHeight * 0.08, paddingLeft: window.innerWidth * 0.06,
                            }}>
                                <h2 style={{ color: "#496fff", fontWeight: "bold", fontSize: window.innerWidth * 0.025 }}>Other things to know</h2>
                                <br />
                                <h3 style={{ color: "#3C435C", fontSize: window.innerWidth * 0.018 }}> In order to create the best playlist for BeachHacks, we recommend following these tips.</h3>
                                <br />

                                <div style={{ display: "inline-flex" }}>
                                    <Button
                                        style={{
                                            color: "white",
                                            backgroundColor: "#496fff",
                                            width: window.innerWidth * 0.09,
                                            height: window.innerHeight * 0.07,
                                            borderRadius: 10,
                                            fontSize: window.innerWidth * 0.009,
                                        }}
                                        onClick={() => { setOpen(false); setMainPageFadeIn(true); setClickNum(1) }}
                                    > Ready to Vibe! </Button>
                                    <img src={"Slider3.png"}
                                        style={{
                                            marginLeft: window.innerWidth * 0.01,
                                            marginTop: "11%",
                                            width: window.innerWidth * 0.026,
                                            height: window.innerHeight * 0.0135
                                        }}></img>
                                </div>
                            </div>
                            <div
                                style={{
                                    paddingLeft: window.innerWidth * 0.08,
                                    paddingRight: window.innerWidth * 0.04,
                                    marginTop: window.innerHeight * 0.09,
                                    width: window.innerWidth * 0.4,
                                    height: window.innerHeight * 0.73
                                }}>
                                <Stack direction="column" spacing={4}>
                                    <Grid
                                        container
                                        sx={{ boxShadow: 3, borderRadius: 3, height: window.innerHeight * 0.1, width: window.innerWidth * 0.27, textAlign: "center" }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <h2 style={{ fontSize: window.innerWidth * 0.015, marginTop: "2%" }}>To keep it professional, avoid<br />explicit songs.</h2>
                                    </Grid>
                                    <Grid
                                        container
                                        sx={{ boxShadow: 3, borderRadius: 3, height: window.innerHeight * 0.1, width: window.innerWidth * 0.27, textAlign: "center" }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <h2 style={{ fontSize: window.innerWidth * 0.015, marginTop: "2%" }}>To keep the playlist diverse,<br />avoid repeating songs.</h2>
                                    </Grid>
                                    <Grid
                                        container
                                        sx={{ boxShadow: 3, borderRadius: 3, height: window.innerHeight * 0.1, width: window.innerWidth * 0.27, textAlign: "center" }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <h2 style={{ fontSize: window.innerWidth * 0.015, marginTop: "2%" }}>Rule 3 here</h2>
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
