import React from "react";
import useAuth from "./useAuth";
import {Container, Form} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/App.css'
import axios from 'axios';

function Dashboard({code}){
    const spotifyApi = new SpotifyWebApi();
    const accessToken = useAuth(code)
    spotifyApi.setAccessToken(accessToken);

    const searchTracks = async(searchQuery) => {
        axios
          .post("http://localhost:3001/searchTracks", {
            searchString : searchQuery,
            accessToken : accessToken,
          })
          .then(res => {
            console.log(res.data.body)
          })
          .catch((err) => {
            console.log(err)
          })
      }

    return (

    // Search Bar Component
    <Container>
        <h1>Spotify Search Bar</h1>
        <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            onChange={(e)=>{searchTracks(e.target.value)}}
        />
    </Container> 
    )}

export default Dashboard;