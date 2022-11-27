// Component for showing track details
import React from "react"
import axios from 'axios';
import { Button, TableCell, TableRow } from '@mui/material';

export default function Track({ track, filter, clickable }) {
  
    let unqueueable = false
    
    if(!filter)
      unqueueable = true
    if(track.explicit)
      unqueueable = true
    
    function handleAdd() {
      if (!track.explicit && clickable && filter) axios.post("http://localhost:3001/queue/add", {
            title: track.title,
            artist: track.artist,
            albumUrl: track.albumUrl,
            uri: track.uri,
            passFilter: track.passFilter,
            explicit: filter
          })
          .then(res => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          }); 
   }

    return (
        <>
            <TableRow hover={true}>
              <TableCell>
                <img src={track.albumUrl} alt={track.title} style={{height : "64px", width: "64px", borderRadius:10}} />
              </TableCell>
              <TableCell align="center">
                {track.title}
              </TableCell>
              <TableCell align="center">
                {track.artist}
              </TableCell>
              <TableCell align="right">
              {
                 !unqueueable && clickable? 
                 <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
                 : clickable ? <Button variant="outlined" disabled>Add</Button> : null
              }
              </TableCell>
            </TableRow>
        </>
    )
}