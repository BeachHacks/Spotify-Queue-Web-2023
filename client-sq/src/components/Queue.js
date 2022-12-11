// Component for rendering the Queue
import React from "react"
import Track from "./Track"
import {  TableContainer, Table, TableBody, tableCellClasses, TableHead, TableCell } from '@mui/material';
export default function Queue({ trackList }) {
    return (
      // Will be modified to include displaying position in queue.
        <TableContainer sx={{ maxHeight: 350, boxShadow:0 }} style={{ overflowY: "auto", width: 550, overflowX:"hidden"}}>
          <Table
          stickyHeader
          sx={{
                [`& .${tableCellClasses.root}`]: {
                borderBottom: "none" },
                boxShadow:0
            }}
          >
          <TableHead>
            <TableCell>#<span style={{marginLeft:60}}>Title</span></TableCell>
          </TableHead>

          <TableBody>
            <TableCell>
              {trackList.map((track, index) => (
                <Track 
                  track={track}
                  key={index}
                  num={index}
                  clickable={false}
              />
              ))}
            </TableCell>
          </TableBody>
            </Table>
        </TableContainer>
    )
}