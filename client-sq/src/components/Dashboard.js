import React, { useState, useEffect, useRef } from "react";
import '../styles/App.css'
import axios from 'axios';
import Queue from "./Queue"
import NavBar from "./NavBar"
import { TextField, Table, Container, TableRow, TableContainer, tableCellClasses, Button} from '@mui/material';
import { Row } from "react-bootstrap";
import DisplayResults from "./DisplayResults";
import NowPlaying from "./NowPlaying";


function Dashboard(props){
    const [searchResults, setSearchResults] = useState([])
    //const [goodSongsArr, setPassArr] = useState([])

    const [dynInput, setInput] = useState("")
    const [search, setSearch] = useState("")

    const [queueData, setQueueData] = useState([])

    const [accessToken, setAccessToken] = useState("")
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

    // Hook handling retrieving token from backend. May be updated to publish-subscribe model
    useEffect(() => {
      let ignore = false;

      async function fetchToken() {
        const result = await axios('http://localhost:3001/token')
        if(!ignore) setAccessToken(result.data)
      }

      fetchToken();

      return () => { ignore = true; }
    }, [])


   const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Perform change here
      setSearch(dynInput)
    }
  }
  
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
            params: {limit: 50}
          })
          .then(res => {
            return res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      } 
      
      function filter(features){
        var boolFilter = []
          for(let i = 0; i < features.length; i++){
            if (features[i] === null) {
              boolFilter.push(false);
            }
            else if (features[i].energy <= 0.3 || 
                features[i].loudness <= -17 ||
                features[i].acousticness >= .8 ||
                features[i].instrumentalness >= 0.60 ||
                features[i].valence <= 0.15 ||
                features[i].tempo <= 45 ) {

              boolFilter.push(false);

          }
            else 
              boolFilter.push(true);
          }
        return boolFilter;
      } 
    
      if(!search) return setSearchResults([])
      // Parse search query
      searchTracks(search).then(res => {

        console.log("AUDIO feats",res.features.audio_features)
        
        let boolArray = filter(res.features.audio_features)

        console.log("filter", boolArray)
        let counter = 0

        setSearchResults(
          res.tracks.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image
                return smallest
              },
              track.album.images[0]
            )
            //Track attributes
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
              albumName : track.album.name,
              songDuration : track.duration_ms,
              explicit: track.explicit, 
              filter: boolArray[counter++]

            }
          })
        )
      })
      
    }, [search])

    return (
    <div  style={{ display:"inline-flex", backgroundColor:"#f6f8fe", width:window.innerWidth, height:window.innerHeight}}>

      <NavBar/>

      <Container style={{ fontFamily:"DM Sans", marginLeft:20, marginTop:10}}>
          <h1 style={{ color:"#3d435a"}}>Home</h1>
          <div style={{display:"flex", flexDirection:"row"}}>
          <TextField
              style={{margin:5, backgroundColor:"#ffffff", width: window.innerWidth*0.26, display: "flex"}}
              type="search"
              placeholder="Search Songs/Artists"
              onChange={(e)=>{setInput (e.target.value)}}
              onKeyPress={handleKeyPress}
          />
          <Button style= {{fontFamily: "DM Sans", fontWeight: "bold",fontSize: 15, display: "flex", flexDirection: Row, height: 55, marginTop: 5}}
          onClick={() =>{setSearch(dynInput)}}
          type="button"
          variant="contained"
          >
          Enter</Button>

          </div>
          <div 
          style={{display:"flex", flexDirection:"row"}}
          >
            <div>
            {/* results component */}
            {searchResults.length === 0?
              <Container 
              sx={{boxShadow:3}}
              style={{ height: window.innerHeight*0.8, marginTop: 10, overflowY: "auto", width: window.innerWidth*0.33, backgroundColor:"#ffffff", padding:10, borderRadius:10, color: "#3d435a"}}>
                Search for a song in the search bar!
              </Container>
              :
              <DisplayResults trackList={searchResults} />}
            </div>
          </div>
      </Container>
      <TableContainer sx={{boxShadow:3 }} style={{
                                          borderRadius:10,
                                          backgroundColor:'#ffffff',
                                          height: window.innerHeight*0.89,
                                          overflowY: "auto",
                                          marginTop: 70,
                                          marginRight:30,
                                          width: window.innerWidth*2,
                                          overflowX:"hidden",
                                          fontFamily:"DM Sans"
                                          }}>
        <Table
        style={{marginLeft:10, marginTop:10}}
        sx={{
              [`& .${tableCellClasses.root}`]: {
              borderBottom: "none" }
          }}
        >
          <TableRow style={{height:window.innerHeight*0.3}}>
              <NowPlaying/>
          </TableRow>
          <TableRow>
              <h2 style={{color:"#3d435a"}}>Next Up</h2>
              <Queue trackList={queueData} />
          </TableRow>
        </Table>
      </TableContainer>
    </div>
    )}

export default Dashboard;
