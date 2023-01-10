import React, { useState, useEffect, useRef } from "react";
import '../styles/App.css'
import axios from 'axios';
import Queue from "./Queue"
import NavBar from "./NavBar"
import {IconButton, TextField, Table, Container, TableRow, TableContainer, tableCellClasses, Button} from '@mui/material';
import { Typography } from '@mui/material';
import { Row } from "react-bootstrap";
import DisplayResults from "./DisplayResults";
import NowPlaying from "./NowPlaying";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchRounded from "@mui/icons-material/SearchRounded";

function Dashboard(){
    const [searchResults, setSearchResults] = useState([])
    //const [goodSongsArr, setPassArr] = useState([])

    const [dynInput, setInput] = useState("")
    const [search, setSearch] = useState("")

    const [queueData, setQueueData] = useState([])

    const [accessToken, setAccessToken] = useState("")

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
            else {
              boolFilter.push(true);
            }
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
      <div style={{minHeight: "100vh",backgroundColor:"#f6f8fe", width:window.innerWidth*.8, maxWidth:"100%"}}>
        <Container style={{ fontFamily:"'DM Sans', sans-serif" , marginTop:window.innerHeight*.045,marginLeft:window.innerWidth*.01, 
        fontSize: window.innerWidth *.021,fontWeight: "1000", color:"#3d435a"}}>Home</Container>
      <div  style={{ display:"inline-flex",  width: "100%", height:window.innerHeight ,marginTop:-window.innerHeight*.00}}>

      

      <Container style={{fontFamily:"'DM Sans', sans-serif" , marginTop:window.innerHeight*.00,marginLeft:window.innerWidth*.01,// outline: '.25vh solid #e00000',
      width:window.innerWidth*.303 }}>
         
          <div style={{display:"flex", flexDirection:"row"}}>

          <input type="search" id = "site-search"  style = {{marginLeft: 0, marginTop: window.innerHeight*.018,
                                                            width: window.innerWidth*.29, 
                                                            height: window.innerHeight*.06,  
                                                            borderRadius: window.innerHeight*.015,
                                                            border: ".25vh solid #e0e4f2",
                                                            paddingLeft: window.innerWidth*.027,
                                                            paddingRight: window.innerWidth*.00875
                                                            }} 
                                                            placeholder ="Search Songs/Artists"  
                                                            className="searchA"
                                                           
          onChange={(e)=>{setInput (e.target.value)}}
           onKeyPress={handleKeyPress}
          />
         
         
         <IconButton 
         
         style= {{ marginTop: window.innerHeight*.0235,marginLeft: -window.innerWidth*.2875, height: window.innerHeight*.05,
           width: window.innerHeight*.05, borderRadius: 80, 
         
           color:"#496fff"}}
         onClick={() =>{setSearch(dynInput)}}
         type="button"
         variant="contained"
         children={<SearchRoundedIcon style = {{fontSize: window.innerWidth*.02 }}/>}
         fullWidth={false}
         >
         </IconButton>
             

          </div>
          <div 
          style={{fontWeight: "bold", display:"flex", flexDirection:"row"}}
          >
            <div>
            {/* results component */}
            {searchResults.length === 0?
              <div 
              //sx={{boxShadow:3}}
              style={{
              border: '.25vh solid #e0e4f2',
              height: window.innerHeight*0.755,
              marginTop: window.innerHeight*0.02, 
              overflowY: "auto",
              width: window.innerWidth*0.29,
              backgroundColor:"#ffffff", 
              padding:10, 
              borderRadius:window.innerHeight*.015,
              color: "#3d435a"}}>
                <div style = {{fontSize: window.innerWidth*0.0154, margin: window.innerHeight*0.015}}>
                Results
                </div>
                <div style = {{fontSize: window.innerWidth*0.01, margin: window.innerHeight*0.015}}>
                Your search results will show here once you <a style = {{color:"#496fff"}}>hit enter</a>
                </div>
              </div >
              :
              <div style = {{
                color: "#3d435a", 
                border: '.25vh solid #e0e4f2',
                borderRadius:window.innerHeight*.015,
                backgroundColor:'#ffffff',  
                width: window.innerWidth*0.29, 
                height: window.innerHeight*0.755, 
                marginTop: window.innerHeight*0.02, }}>
                <div style = {{fontSize: window.innerWidth*0.015, marginLeft: window.innerWidth*0.012,marginTop:window.innerHeight*0.015 }}>
                Results
                </div>
                <div style = {{fontSize: window.innerWidth*0.01, marginLeft: window.innerWidth*0.012,marginTop:window.innerHeight*0.006,height: "2vh"}}>
                Explicit or recently added songs are grayed out.
                </div>

                <DisplayResults trackList={searchResults} />
              </div>
              }
            </div>
          </div>
      </Container>
      <Container style={{fontFamily:"'DM Sans', sans-serif" , marginTop:window.innerHeight*.05,// outline: '.25vh solid #e00000'
      }}>
     
      <Container  style={{   border: '.25vh solid #e0e4f2',
                                          borderRadius:window.innerHeight*.015,
                                          backgroundColor:'#ffffff',
                                          height: window.innerHeight*0.835,
                                          width: window.innerWidth*0.4,
                                          overflowY: "hidden",
                                          marginTop: -window.innerHeight*.032,
                                          marginLeft:-window.innerHeight*.0,
                                          minWidth: window.innerWidth*.4748,
                                          overflowX:"hidden",
                                          fontFamily:"DM Sans"
                                          }}>


        <div style = {{marginLeft:-window.innerHeight*.02}}>  
        <div
        style={{ marginLeft:window.innerWidth*.012, marginTop:window.innerHeight*.026}}
        
        >

          <div style={{height:window.innerHeight*0.3}}>
              <h2 style={{ color: "#3d435a", fontWeight: "1000", fontSize:window.innerWidth*0.0167}}>Now playing</h2>
            {accessToken === ""? 
            <h2>LOGIN TO SEE THE PLAYER</h2>:
            <NowPlaying/>
            }
          </div>
          <div>
              <h2 style={{color:"#3d435a", marginTop: -window.innerHeight*0.001,fontSize:window.innerWidth*0.0147,height: "4vh", fontWeight: "1000"}}>Next up</h2>
              <div style={{marginLeft:-window.innerWidth*.0045}}>
            <div style={{marginTop: window.innerHeight*0.0075,fontSize : window.innerWidth*0.01,fontFamily: "DM Sans", fontWeight: "bold",color: "#3d435a"}}>
            <span style={{marginLeft:window.innerWidth*0.011}}>
            #
                </span>
              <span style={{marginLeft:window.innerWidth*0.02}}>
                Title
                </span>

                
                <div style={{ 
                  borderTop: ".25vh solid #e0e4f2", 
                  marginLeft:window.innerWidth*0.00425, 
                
                  width: window.innerWidth*.4453,
                  marginTop: window.innerHeight*.00755, 
                  height:window.innerHeight*.018 }}
                />     
                
                </div>
          </div>
          <Queue trackList={queueData} />
              
          </div>
          
        </div>
        
        </div>     
      </Container>
    </Container>
    
    </div>
    
    </div>
    )}

export default Dashboard;

