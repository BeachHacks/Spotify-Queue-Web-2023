import React from "react";
import useAuth from "./useAuth";
import {Container, Form} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/App.css'

function Dashboard({code}){
    const spotifyApi = new SpotifyWebApi();
    const accessToken = useAuth(code)

    spotifyApi.setAccessToken(accessToken);

    const onSearchChange = async(searchQuery) =>{
        spotifyApi.searchTracks(searchQuery).then(
        function(data) {
            console.log('Artist albums', data.body);
        },
        function(err) {
            console.error(err);
        }
        )
    }
    return (

    // Search Bar Component
    <Container>
        <h1>Spotify Search Bar</h1>
        <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            onChange={(e)=>{onSearchChange(e.target.value)}}
        />
    </Container> 
    )}

export default Dashboard;