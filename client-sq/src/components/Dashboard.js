import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import {Container, Form} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/App.css'
import axios from 'axios';
import Track from "./Track"

function Dashboard({code}){
    const spotifyApi = new SpotifyWebApi();
    const accessToken = useAuth(code)
    spotifyApi.setAccessToken(accessToken);
    const [searchResults, setSearchResults] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
      const searchTracks = async(searchQuery) => {
        return axios
          .post("http://localhost:3001/searchTracks", {
            searchString : searchQuery,
            accessToken : accessToken,
          })
          .then(res => {
            //console.log(res.data.body)
            return res.data.body;
          })
          .catch((err) => {
            console.log(err)
          })
      } 
    
      if(!search) return setSearchResults([])
      if(!accessToken) return
      
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

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            }
          })
        )
      })
    }, [search, accessToken])

    return (

    // Search Bar Component
    <Container>
        <h1>Spotify Search Bar</h1>
        <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            onChange={(e)=>{setSearch(e.target.value)}}
        />
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto"}}>
          {searchResults.map(track => (
            <Track 
              track={track}
              key={track.uri}
              />
          ))}
        </div>
        
    </Container> 
    )}

export default Dashboard;