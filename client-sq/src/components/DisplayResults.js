// Component for rendering the Queue
import React from "react"
import Track from "./Track"
// import {Container} from 'react-bootstrap';
import { TableContainer, Table, TableBody, tableCellClasses } from '@mui/material';
export default function DisplayResults({ trackList }) {
    return (

        <TableContainer   style={{ height: window.innerHeight*0.625, marginTop: window.innerHeight*0.02, overflowY: "auto",
        width: "auto", overflowX:"hidden"}}>

            <Table stickyHeader
                    sx={{
                        [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none" ,
                        
                        }
                    }}
                     aria-label="sticky table">
                 
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