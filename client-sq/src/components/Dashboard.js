import React from "react";
import useAuth from "./useAuth";
import {Container, Form} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';

function Dashboard({code}){
    // const accessToken = useAuth(code)
    // return (<div>{(console.log(code))}</div>);
    

    return <Container>
        <h1>Spotify Search Bar Results</h1>

    <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        // value={'search'}
        onChange={(e)=>{console.log('asdf')}}
    />
        </Container> 
}

export default Dashboard;