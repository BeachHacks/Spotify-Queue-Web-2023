import React, { useState, useEffect } from "react";
import '../styles/App.css'
import axios from 'axios';

import Track from "./Track"
import { TextField, Container } from '@mui/material';
import {  TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Paper, tableCellClasses } from '@mui/material';

function History(){

    const [historyData, setHistoryData] = useState([])

    // Hook handling retrieving the data of the queue from the backend.
    useEffect(() => {
    let ignore = false; 

    async function fetchHistory() {
        const result = await axios('http://localhost:3001/playback/history');
        if (!ignore) setHistoryData(result.data);
    }

    const interval = setInterval(() => {
        fetchHistory();
    }, 1000);

    return () => {ignore = true; clearInterval(interval);}
    }, [])


    return (

      <div style={{minHeight: "100vh", width:"80%", maxWidth:"100%"}}>
        <Container style={{ fontFamily:"DM Sans", padding: "10px 44px", minWidth:"100%", minHeight:"100%"}}>
            <h1 style={{color:"#4e69ec"}}>History</h1>
            <TextField
                        style={{margin:0, backgroundColor:"#ffffff", width: "100%"}}
                        type="search"
                        placeholder="Search with a word or artist"
                        onChange={(e)=>{}}
                    />
            <div 
            style={{display:"flex", flexDirection:"row"}}
            >
                <div style={{width: "100%"}}>
                {historyData.length === 0?
                <Container 
                sx={{boxShadow:3}}
                style={{ height: window.innerHeight*0.8, marginTop: 10, overflowY: "auto", backgroundColor:"#ffffff", padding:10, borderRadius:15, color: "#3d435a", }}>
                   Loading history...
                </Container>
                :
                <TableContainer sx={{ boxShadow:3 }} component={Paper} style={{borderRadius:15, backgroundColor:'#ffffff', height: "82.5vh", width: "100%", overflowX:"hidden", marginTop: 10,}}>
                    <Table sx={{
                                [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none" }
                            }}
                            stickyHeader aria-label="sticky table">
                        <TableHead sx={{}}>
                            <TableCell style={{ width: 50 }} align="left">
                            </TableCell>
                            <TableCell style={{ fontFamily: "DM Sans", fontSize: 20, }} align="left">
                                Title
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {historyData.map(track => (
                                <Track 
                                track={track}
                                filter = {Array.from({length:historyData.length}, () => true)}
                                key={track.uri}
                                clickable={true}
                                albumName={track.albumName}
                                duration={track.songDuration}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                }
                </div>
            </div>
        </Container>
        
      </div>
        )}

export default History;