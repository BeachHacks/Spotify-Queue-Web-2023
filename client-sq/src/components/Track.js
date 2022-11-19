// Component for showing track details
import React from "react"
import axios from 'axios';
import { Button, TableCell, TableRow } from '@mui/material';

export default function Track({ track, clickable }) {
    let gray = ""
    if(!track.passFilter)
      gray = " GRAY OUT (filter) "
    if(track.explicit)
      gray = " GRAY OUT (explicit) "
    
    function handleAdd() {
      if (!track.explicit && clickable && track.passFilter) axios.post("http://localhost:3001/queue/add", {
            title: track.title,
            artist: track.artist,
            albumUrl: track.albumUrl,
            uri: track.uri,
            passFilter: track.passFilter,
            explicit: track.explicit
          })
          .then(res => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          }); 
      else {
        if(track.explicit)
        console.log('Explicit song will not be added to queue')
        else
        console.log('Song does not pass filter requirements (Your song is boring zzZ)')
            
     }
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
                 gray === "" && clickable? 
                 <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
                 : clickable ? <Button variant="outlined" disabled>Add</Button> : null
              }
              </TableCell>
            </TableRow>
        </>
    )
}