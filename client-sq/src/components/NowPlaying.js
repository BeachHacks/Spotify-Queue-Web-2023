import React, { useState, useEffect, useRef } from "react";
import { TableRow, TableCell } from '@mui/material';
import ProgressBar from "./ProgressBar";

function NowPlaying(){
    const [timer, setTimer] = useState(0);
    const id = useRef(null);
    const clear = () => { window.clearInterval(id.current); };

    useEffect(() => {
        id.current = window.setInterval(() => {
            setTimer((time) => time + 1);
        }, 1000);
        return () => clear();
    }, []);

    useEffect(() => {
        if (timer >= 101) {
            setTimer(0);
        }
    }, [timer]);

    return(
        <>
            <h2 style={{ color:"#3d435a", marginBottom: 5, marginTop: 12, marginLeft: 12,fontSize:24, fontWeight: "1000" }}>Now Playing</h2>

            <div style={{ marginLeft: 12,display: "inline-flex", width: "90%" }}>
                <div>
                    <img src="https://i1.sndcdn.com/artworks-k3nFy3VUf0Ih-0-t500x500.jpg"
                        alt={"HardCoded"}
                        style={{ height: "150px", width: "150px" }} />
                </div>
                <div style={{ alignSelf: "flex-end", marginLeft: 15, marginBottom: 10 }}>
                    <h3>Anti-Hero</h3>
                    <h6>Taylor Swift</h6>
                    <ProgressBar number={timer} style={{ width: "420px" }} />
                    <div> Counter for Reference: {timer}</div>
                </div>
            </div>
            
            {/* <TableRow style={{ display: "inline-flex", }}>
                <TableCell>
                    <img src="https://i1.sndcdn.com/artworks-k3nFy3VUf0Ih-0-t500x500.jpg"
                        alt={"HardCoded"}
                        style={{ height: "150px", width: "150px" }} />
                </TableCell>
                <TableCell style={{alignSelf:"end",}}>
                    <h3>Anti-Hero</h3>
                    <h6>Taylor Swift</h6>
                    <ProgressBar number={timer} style={{ width: "420px" }} 
                    />
                    <p> Counter for Reference: {timer}</p>
                </TableCell>
            </TableRow> */}
        </>
    )
}
export default NowPlaying;