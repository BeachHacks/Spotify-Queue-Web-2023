// Component for rendering the Queue
import React from "react"
import Track from "./Track"
import { TableContainer, Table, TableBody, tableCellClasses, TableCell } from '@mui/material';

export default function Queue({ trackList }) {
  return (
    // Will be modified to include displaying position in queue.
    <TableContainer sx={{ maxHeight: window.innerHeight * .45, boxShadow: 0, width: window.innerWidth * .46, }} style={{ overflowY: "auto", overflowX: "hidden", marginLeft: -window.innerWidth * 0.005 }}>

      <Table
        stickyHeader
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none"
          },
          boxShadow: 0,

        }}
      >

        <TableBody >
          <TableCell >
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