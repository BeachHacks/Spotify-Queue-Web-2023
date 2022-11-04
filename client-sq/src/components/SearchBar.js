import React from "react";
import { useState, useEffect } from "react";
import '../styles/App.css';
import { Button, Container, Form } from 'react-bootstrap';
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"


function SearchBar() {
    

  const spotifyApi = new SpotifyWebApi();

  const access_token = "BQDAsED_PmfBRj_F3G8HLPd-E8NABtGPPiB8x7Ezq1PkjyqppdyREWm1z5e_pWulhE3-gfIF1uK8Lav5qZsbJRnZPRtBxI9sGCqg2xu708CX_hnVEmQ"

  //TODO: Need to find a way to generate and renew access token using ClientID and ClientSecret. Refer "https://developer.spotify.com/documentation/general/guides/authorization/code-flow/"
  //Input the access token. Every Access token will be valid upto an hour.
  spotifyApi.setAccessToken(access_token);

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
        //   <div>
        //     <Button>asdf</Button>
        //     <h1>Spotify Search Bar Results</h1>
        //     <input type={"text"} onChange={(e)=>{console.log('printing')}}></input>
        //   </div>
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
            <h1>Spotify Search Bar Results</h1>

            <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                // value={'search'}
                onChange={(e)=>{onSearchChange(e.target.value)}}
            />
        </Container>

    );
  }
  
  export default SearchBar;