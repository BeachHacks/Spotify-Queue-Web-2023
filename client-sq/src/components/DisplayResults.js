// Component for rendering the Queue
import React from "react"
import Track from "./Track"
// import {Container} from 'react-bootstrap';
import { TableContainer, Table, TableBody, tableCellClasses } from '@mui/material';
export default function DisplayResults({ trackList }) {
    return (
        <TableContainer style={{
            border: '.3vh solid #e0e4f2',

            borderRadius: window.innerHeight * .015,

            backgroundColor: '#ffffff', height: window.innerHeight * 0.75, marginTop: window.innerHeight * 0.02, overflowY: "auto",
            width: window.innerWidth * 0.29, overflowX: "hidden"
        }}>
            <Table
                sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",

                    }
                }}
                stickyHeader aria-label="sticky table">

                <TableBody style={{ height: 265 }}>
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