// Component for rendering the Queue
import React from "react"
import Track from "./Track"
import {  TableContainer, Table, TableBody, tableCellClasses, TableHead, TableCell, Divider } from '@mui/material';
export default function Queue({ trackList }) {
    return (
      // Will be modified to include displaying position in queue.
        <TableContainer sx={{ maxHeight: window.innerHeight*.45, boxShadow:0 }} style={{ overflowY: "auto", width: window.innerWidth*.55, overflowX:"hidden"}}>
          <Table
          stickyHeader
          sx={{
                [`& .${tableCellClasses.root}`]: {
                borderBottom: "none" },
                boxShadow:0
            }}
          >
          <TableHead>
            <TableCell style={{fontSize : "120%",fontFamily: "DM Sans", fontWeight: "bold",color: "#3d435a"}}>
            <span style={{marginLeft:window.innerWidth*.0065}}>
            #
                </span>
              <span style={{marginLeft:window.innerWidth*.063}}>
                Title
                </span>
                <Divider  sx={{  border: "1px solid #e0e4f2" }}component="nav" style={{ marginTop: window.innerHeight*.009}}/>     
                </TableCell>
           
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