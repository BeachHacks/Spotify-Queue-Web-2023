import React, { useState, useEffect } from "react";
import '../styles/App.css'
import axios from 'axios';
import NavBar from "./NavBar"
import Track from "./Track"
import { TextField, Container } from '@mui/material';
import {  TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Paper, tableCellClasses } from '@mui/material';

function History(){

    const [historyData, setHistoryData] = useState([])
    const [searchedHistory, setSearchedHistory] = useState(historyData)

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

    const searchHistory = (term) => {
      setSearchedHistory(historyData.filter((track) => (track.title.toLowerCase().includes(term.toLowerCase()) || track.artist.toLowerCase().includes(term.toLowerCase()))))
    }

    return (
        <div  style={{ display:"inline-flex", backgroundColor:"#f6f8fe", width:window.innerWidth, height:window.innerHeight}}>
        
        <NavBar/>

        <Container style={{ fontFamily:"DM Sans", marginLeft:20, marginTop:10}}>
            <h1 style={{color:"#4e69ec"}}>History</h1>
            <TextField
                        style={{margin:0, backgroundColor:"#ffffff", width: window.innerWidth*0.725}}
                        type="search"
                        placeholder="Search with a word or artist"
                        onChange={(e)=>{searchHistory(e.target.value)}}
                    />
            <div 
            style={{display:"flex", flexDirection:"row"}}
            >
                <div>
                {historyData.length === 0?
                <Container 
                sx={{boxShadow:3}}
                style={{ height: window.innerHeight*0.8, marginTop: 10, overflowY: "auto", width: window.innerWidth, backgroundColor:"#ffffff", padding:10, borderRadius:10, color: "#3d435a"}}>
                    Nothing played yet!
                </Container>
                :
                <TableContainer sx={{ boxShadow:3 }} component={Paper} style={{borderRadius:10, backgroundColor:'#ffffff', height: window.innerHeight*0.825, width: window.innerWidth*0.724, overflowX:"hidden", marginTop: 10,}}>
                    <Table sx={{
                                [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none" }
                            }}
                            stickyHeader aria-label="sticky table">
                        <TableHead sx={{}}>
                            <TableCell style={{ width: 50 }} align="left">
                            </TableCell>
                            <TableCell style={{ fontFamily: "DM Sans", fontSize: 20, }} alight="left">
                                Title
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {(searchedHistory.length > 0 ? searchedHistory : historyData).map(track => (
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
