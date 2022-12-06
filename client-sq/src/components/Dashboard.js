import React, { useState, useEffect } from "react";
import '../styles/App.css'
import axios from 'axios';
import Queue from "./Queue"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ScheduleRoundedIcon from '@mui/icons-material/Schedule';
import CommentRoundedIcon from '@mui/icons-material/Comment';
import { TextField, Table, Tab, Tabs, Container, TableRow, TableContainer, tableCellClasses,} from '@mui/material';
import DisplayResults from "./DisplayResults";

function Dashboard(){
    const [searchResults, setSearchResults] = useState([])
    const [goodSongsArr, setPassArr] = useState([])
    const [search, setSearch] = useState("")
    const [queueData, setQueueData] = useState([])
    const [value, setValue] = useState(0);

    const handleChange = (event,newValue) => {
      setValue(newValue);
      console.log(value)
    };

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
      let idArr = [];
      const getFeats = async(arr) => {
        return axios
          .post("http://localhost:3001/getAudioFeaturesForTracks", {
            idArr : arr,
          })
          .then(res => {
            return res.data.body;
          })
          .catch((err) => {
            console.log(err)
          })
      }
      const searchTracks = async(searchQuery) => {
        return axios
          .post("http://localhost:3001/searchTracks", {
            searchString : searchQuery,
            params: {limit: 50}
          })
          .then(res => {
            console.log(res.data.body)
            return res.data.body;
          })
          .catch((err) => {
            console.log(err)
          })
      } 
      
      function filter(idArr){
        var boolFilter = []
        getFeats(idArr).then(res=>{
          let features = res.audio_features
          for(let i = 0; i < idArr.length; i++){
            if (features[i].energy <= 0.3 || 
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
        })
        return boolFilter;
      } 
    
      if(!search) return setSearchResults([])
      // Parse search query
      searchTracks(search).then(res => {
        
        //get id array from search
        for(let i = 0; i < res.tracks.items.length; i++)
          idArr.push(res.tracks.items[i].uri.replace('spotify:track:', ''))

        setPassArr(
          filter(idArr)
        )

        setSearchResults(
          res.tracks.items.map(track => {
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
              explicit: track.explicit
            }
          })
        )
      })
      
    }, [search])

    return (
    <div  style={{ display:"inline-flex", backgroundColor:"#f6f8fe", width:window.innerWidth, height:window.innerHeight}}>
      <Container style={{
                        backgroundColor:"#ffffff",
                        width: window.innerWidth*0.2,
                        height: "100vh",
                        fontFamily:"DM Sans"
                        }}
                        sx={{boxShadow:10}}
                        >
        <div style={{alignItems:"center", alignSelf:"center", alignContent:"center", marginLeft:window.innerWidth*0.01, boxShadow:10}}>
          <h1 style={{fontWeight:"bolder", marginTop: 10, color:"#3d435a", fontFamily:"DM Sans"}}>BeachQueue</h1>
          <p style={{ marginTop:50, color: "#3d435a", }}>Menu</p>

          <Tabs orientation="vertical" value={value} onChange={handleChange}>
            <Tab icon={<HomeRoundedIcon/>} iconPosition="start" label="Home" value="0" style={{width: window.innerWidth*0.15, borderRadius: 10, color: "#3d435a"}} fullWidth/>
            <Tab icon={<ScheduleRoundedIcon/>} iconPosition="start" label= "History" value="1" style={{width: window.innerWidth*0.15, borderRadius: 10, color: "#3d435a"}} fullWidth/>
            <Tab icon={<CommentRoundedIcon/>} iconPosition="start" label="How To Use" value="2" style={{width: window.innerWidth*0.15, borderRadius: 10, color: "#3d435a"}} fullWidth/>
          </Tabs>
 
        </div>
      </Container>

      <Container style={{ fontFamily:"DM Sans", marginLeft:20, marginTop:10}}>
          <h1 style={{color:"#4e69ec"}}>Home</h1>
          <TextField
              style={{margin:5, backgroundColor:"#ffffff", width: window.innerWidth*0.325}}
              type="search"
              placeholder="Search Songs/Artists"
              onChange={(e)=>{setSearch(e.target.value)}}
          />

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
              <DisplayResults trackList={searchResults} filterArr={goodSongsArr} />}
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
          <TableRow style={{height:window.innerHeight*0.35}}>
            <h2 style={{color:"#3d435a"}}>Now Playing</h2>
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