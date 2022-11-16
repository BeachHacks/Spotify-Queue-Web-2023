// Component for rendering the Queue
import React from "react"
//import axios from 'axios';
import Track from "./Track"

export default function Queue({ trackList }) {

    return (
      // Will be modified to include displaying position in queue.
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto"}}>
            {trackList.map((track, index) => (
              <Track 
                track={track}
                key={index}
                clickable={false}

              />
          ))}
          </div> 
    )
}