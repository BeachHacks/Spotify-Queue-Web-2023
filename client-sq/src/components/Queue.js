// Component for rendering the Queue
import React from "react"
import Track from "./Track"
import {  TableContainer, Table, TableBody, Paper } from '@mui/material'

export default function Queue({ trackList }) {

    return (
      // Will be modified to include displaying position in queue.
        <TableContainer component={Paper} style={{overflowY: "auto"}}>
          <Table>
            <TableBody>
                {trackList.map((track, index) => (
                  <Track 
                    track={track}
                    key={index}
                    clickable={false}
                  />
              ))}
              </TableBody>
            </Table>
        </TableContainer>
    )
}