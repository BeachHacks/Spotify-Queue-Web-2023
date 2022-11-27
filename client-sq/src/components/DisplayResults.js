// Component for rendering the Queue
import React from "react"
import Track from "./Track"
import {Container} from 'react-bootstrap';
import {  TableContainer, Table, TableCell, TableBody, TableHead, TableRow, Paper } from '@mui/material';

export default function DisplayResults({ trackList, filterArr }) {
    return (
        <TableContainer component={Paper} style={{ height: "75vh", overflowY: "auto"}}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {/* <TableCell></TableCell> */}
                <TableCell align="left">Songs</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {trackList.map(track => (
                    <Track 
                    track={track}
                    filter = {filterArr}
                    key={track.uri}
                    clickable={true}
                    />
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}