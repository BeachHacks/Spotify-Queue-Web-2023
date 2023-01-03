// Component for rendering the Queue
import React from "react"
import Track from "./Track"
// import {Container} from 'react-bootstrap';
import {  TableContainer, Table, TableBody, TableHead, TableRow, Paper, tableCellClasses } from '@mui/material';
export default function DisplayResults({ trackList }) {
    return (
        <TableContainer   style={{ 
            borderLeft: '2.5px solid #e0e4f2',
              borderRight: '2.5px solid #e0e4f2',
              borderBottom: '2.5px solid #e0e4f2',
              borderBottomLeftRadius:window.innerHeight*.015,
              borderBottomRightRadius:window.innerHeight*.015,
               backgroundColor:'#ffffff', height: window.innerHeight*0.784, overflowY: "auto",
         width: window.innerWidth*0.29, overflowX:"hidden", marginTop: window.innerHeight*0.00}}>
            <Table 
                    sx={{
                        [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none" 
                        }
                    }}
                    stickyHeader aria-label="sticky table">
                 
                <TableBody style={{height:265}}>
                    {trackList.map(track => (
                        <Track 
                        track={track}
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