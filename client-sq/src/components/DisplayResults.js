// Component for rendering the Queue
import React from "react"
import Track from "./Track"
// import {Container} from 'react-bootstrap';
import {  TableContainer, Table, TableBody, TableHead, TableRow, Paper, tableCellClasses } from '@mui/material';
export default function DisplayResults({ trackList, filterArr }) {
    return (
        <TableContainer sx={{ maxHeight: 700,boxShadow:3 }} component={Paper} style={{borderRadius:10, backgroundColor:'#ffffff', height: window.innerHeight*0.8, overflowY: "auto", width: window.innerWidth*0.33, overflowX:"hidden", marginTop: 10}}>
            <Table sx={{
                        [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none" }
                    }}
                    stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell><h1>Results</h1></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell> */}
                        {/* <TableCell></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trackList.map(track => (
                        <Track 
                        track={track}
                        filter = {filterArr}
                        key={track.uri}
                        clickable={true}
                        albumName={track.albumName}
                        duration={track.songDuration}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}