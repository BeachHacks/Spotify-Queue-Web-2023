// Component for rendering the Queue
import React from "react"
import Track from "./Track"
import {Container} from 'react-bootstrap';
import {  TableContainer, Table, TableCell, TableBody, TableHead, TableRow, Paper } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";
export default function DisplayResults({ trackList, filterArr }) {
    return (
        <TableContainer component={Paper}style={{height: "75vh", overflowY: "auto", width: 700}}>
            <Table sx={{
                        [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                        }
                    }}
                    style={{ width: 700, border: "collapse", height: 50}} 
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