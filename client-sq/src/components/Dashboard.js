import React, { useState, useEffect } from "react";
//import useAuth from "./useAuth";
import {Container, Form} from 'react-bootstrap';
//import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/App.css'
import axios from 'axios';
import Track from "./Track"
import Queue from "./Queue"

function Dashboard(){
    //const spotifyApi = new SpotifyWebApi();
    //const accessToken = useAuth(code)
    //spotifyApi.setAccessToken(accessToken);
    const [searchResults, setSearchResults] = useState([])
    const [search, setSearch] = useState("")
    const [queueData, setQueueData] = useState([])

    // Hook handling retrieving the data of the queue from the backend.
    useEffect(() => {
      let ignore = false; 

      async function fetchQueue() {
        const result = await axios('http://localhost:3001/queue/show');
        if (!ignore) setQueueData(result.data);
      }

      const interval = setInterval(() => {
        fetchQueue();
      }, 1000);

      return () => {ignore = true; clearInterval(interval);}
    }, [])


    // Hook handling relay of search request to backend. Backend serves as middle to Spotify API.
    useEffect(() => {
      const searchTracks = async(searchQuery) => {
        return axios
          .post("http://localhost:3001/searchTracks", {
            searchString : searchQuery,
           //accessToken : accessToken,
          })
          .then(res => {
            console.log(res.data.body)
            return res.data.body;
          })
          .catch((err) => {
            console.log(err)
          })
      } 
    
      if(!search) return setSearchResults([])
      //if(!accessToken) return
     
      // Parse search query
      searchTracks(search).then(res => {
        setSearchResults(
          res.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image
                return smallest
              },
              track.album.images[0]
            )
            
            // Track attributes
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
              explicit: track.explicit
            }
          })
        )
      })
    }, [search])

    return (

    // Dashboard Component 
    <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
        <h1>Spotify Search Bar</h1>
        <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            onChange={(e)=>{setSearch(e.target.value)}}
        />
        <div className="flex-grow-1 my-2" style={{ height: "75vh", overflowY: "auto"}}>
          {searchResults.map(track => (
            <Track 
              track={track}
              key={track.uri}
              clickable={true}
              />
          ))}
        </div>
        <h1>Queue</h1>
        <div style= {{ height: "30vh", overflowY: "auto"}}>
          <Queue trackList={queueData} />
        </div>
       
    </Container> 
    )}

export default Dashboard;