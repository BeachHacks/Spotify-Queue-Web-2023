import React, { useState, useEffect, useContext } from "react";
import '../styles/App.css'
import axios from 'axios';
import Queue from "./Queue"
import { IconButton, Container } from '@mui/material';
import DisplayResults from "./DisplayResults";
import NowPlaying from "./NowPlaying";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SocketContext } from './App'

const Dashboard = ({ theme }) => {

  const [borderColor, setBC] = useState(".25vh solid " + theme.palette.common.border)

  const socket = useContext(SocketContext);

  const [text, setText] = useState("Loading")
  const [searchResults, setSearchResults] = useState([])
  //const [goodSongsArr, setPassArr] = useState([])
  const [dynInput, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [queueData, setQueueData] = useState([])
  const [accessToken, setAccessToken] = useState("")

  const [loading, setLoading] = useState(false)


  const [clicked, setClicked] = useState(false)
  const [clickedSB, setClickedSB] = useState(theme.palette.common.misc)

  function handleFocus() {
    setClickedSB(theme.palette.primary.main)
    setBC(".25vh solid " + theme.palette.primary.main)
    setClicked(true)
  }

  function handleBlur() {
    setClickedSB(theme.palette.common.misc)
    setBC(".25vh solid " + theme.palette.common.border)
    setClicked(false)
  }
  useEffect(() => {
    let ignore = false;

    async function fetchToken() {
      const result = await axios(process.env.REACT_APP_API_URL + '/host/token')
      if (!ignore) setAccessToken(result.data)
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
      const result = await axios(process.env.REACT_APP_API_URL + '/queue/show');
      if (!ignore) setQueueData(result.data);
    }
    fetchQueue();

    socket.on('queueAdd', (data) => {
      setQueueData((prevData) => [...prevData, data]);
    })

    socket.on('queuePop', (data) => {
      setQueueData((prevData) => [...prevData.slice(1)]);
    })

    return () => { ignore = true; socket.off('queueAdd'); socket.off('queuePop') }
  }, [])

  useEffect(() => {

    function loadingDots() {
      let timer = setTimeout(() => {
        setText("Loading.")
      }, 250)

      let timer2 = setTimeout(() => {
        setText("Loading..")
      }, 500)

      let timer3 = setTimeout(() => {
        setText("Loading...")
      }, 750)
    }

    if (loading) {
      loadingDots()
      setText("Loading")
    }
  }, [loading])

  // Hook handling relay of search request to backend. Backend serves as middle to Spotify API.
  useEffect(() => {

    const searchTracks = async (searchQuery) => {
      setLoading(true)
      return axios
        .post(process.env.REACT_APP_API_URL + "/search/tracks", {
          searchString: searchQuery,
          params: { limit: 50 }
        })
        .then(res => {
          setLoading(false)
          return res.data;

        })
        .catch((err) => {
          console.log(err)
        })
    }



    function filter(features) {
      var boolFilter = []
      for (let i = 0; i < features.length; i++) {
        if (features[i] === null) {
          boolFilter.push(false);
        }
        else if (features[i].energy <= 0.3 ||
          features[i].loudness <= -17 ||
          features[i].acousticness >= .8 ||
          features[i].instrumentalness >= 0.60 ||
          features[i].valence <= 0.15 ||
          features[i].tempo <= 45) {

          boolFilter.push(false);

        }
        else {
          boolFilter.push(true);
        }
      }
      return boolFilter;
    }


    if (!search) return setSearchResults([])
    // Parse search query

    searchTracks(search).then(res => {

      console.log("AUDIO feats", res.features.audio_features)

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
            albumName: track.album.name,
            songDuration: track.duration_ms,
            explicit: track.explicit,
            filter: boolArray[counter++]

          }
        })
      )
    })

  }, [search])


  return (
    <div style={{ minHeight: "100vh", backgroundColor: theme.palette.background.primary, width: window.innerWidth * .8, maxWidth: "100%" }}>
      <Container style={{
        fontFamily: "'DM Sans', sans-serif", marginTop: window.innerHeight * .045, marginLeft: window.innerWidth * .01,
        fontSize: window.innerWidth * .021, fontWeight: "1000", color: theme.palette.text.primary
      }}>Home</Container>
      <div style={{ display: "inline-flex", width: "100%", height: window.innerHeight, marginTop: -window.innerHeight * .00 }}>
        <Container style={{
          fontFamily: "'DM Sans', sans-serif",
          marginTop: window.innerHeight * .00,
          marginLeft: window.innerWidth * .01,
          width: window.innerWidth * .303
        }}>

          <div style={{ display: "flex", flexDirection: "row" }}>

            <input type="search" id="site-search" style={{
              marginLeft: 0,
              marginTop: window.innerHeight * .018,
              width: window.innerWidth * .29,
              height: window.innerHeight * .06,
              borderRadius: window.innerHeight * .015,
              border: borderColor,
              borderColor: theme.palette.common.border,
              paddingLeft: window.innerWidth * .027,
              paddingRight: window.innerWidth * .00875,
              backgroundColor: theme.palette.background.secondary,
              color: theme.palette.text.primary
            }}
              placeholder="Search for a song to queue"
              className="searchA"
              onChange={(e) => { setInput(e.target.value) }}
              onKeyPress={
                handleKeyPress
              }
              onFocus={handleFocus}
              onBlur={handleBlur} />


            <IconButton disableRipple

              style={{
                marginTop: window.innerHeight * .0235, marginLeft: -window.innerWidth * .2875, height: window.innerHeight * .05,
                width: window.innerHeight * .05, borderRadius: 80,

                color: clickedSB
              }}
              onClick={() => {

                setSearch(dynInput)

              }}
              type="button"
              variant="contained"
              children={<SearchRoundedIcon style={{ fontSize: window.innerWidth * .02 }} />}
              fullWidth={false}
            >
            </IconButton>


          </div>
          <div
            style={{ fontWeight: "bold", display: "flex", flexDirection: "row" }}
          >
            <div>
              {/* results component */}
              {searchResults.length === 0 ?
                <div
                  //sx={{boxShadow:3}}
                  style={{
                    border: '.25vh solid ' + theme.palette.common.border,
                    height: window.innerHeight * 0.755,
                    marginTop: window.innerHeight * 0.02,
                    overflowY: "auto",
                    width: window.innerWidth * 0.29,
                    backgroundColor: theme.palette.background.secondary,

                    borderRadius: window.innerHeight * .015,
                    color: theme.palette.text.primary
                  }}>

                  {!clicked ?
                    <div style={{ padding: "1vh", fontSize: window.innerWidth * 0.0154, marginTop: window.innerHeight * 0.011, marginLeft: window.innerWidth * 0.007 }}>
                      <div style={{ height: '25vh' }}>
                        <div style={{ fontSize: window.innerWidth * 0.0145, height: "4.25vh" }}>
                          Guidelines
                        </div>

                        <div style={{ fontWeight: 500, display: "flex", flexDirection: "row", marginTop: "1.75vh" }}>
                          <div class="circle" style={{
                            backgroundColor: theme.palette.background.secondary,
                            border: ".25vh solid " + theme.palette.text.primary,
                            color: theme.palette.text.primary, fontSize: "1vw", marginLeft: ".4vw", marginTop: ".6vh"
                          }} >1</div>
                          <div style={{ fontSize: window.innerWidth * 0.0105, width: "23vw", marginLeft: "1vw", lineHeight: '2.5vh' }}>
                            To keep the playlist diverse, add a variety of songs. Everyone loves discovering new jams!
                          </div>
                        </div>

                        <div style={{ fontWeight: 500, display: "flex", flexDirection: "row", marginTop: "2vh" }}>
                          <div class="circle" style={{
                            backgroundColor: theme.palette.background.secondary,
                            border: ".25vh solid " + theme.palette.text.primary,
                            color: theme.palette.text.primary, fontSize: "1vw", marginLeft: ".4vw", marginTop: ".6vh"
                          }} >2</div>
                          <div style={{ fontSize: window.innerWidth * 0.0105, width: "23vw", marginLeft: "1vw", lineHeight: '2.5vh' }}>
                            If you loved a song you heard earlier, you can find it again in the history tab.
                          </div>
                        </div>

                        <div style={{ fontWeight: 500, display: "flex", flexDirection: "row", marginTop: "2vh" }}>
                          <div class="circle" style={{
                            backgroundColor: theme.palette.background.secondary,
                            border: ".25vh solid " + theme.palette.text.primary,
                            color: theme.palette.text.primary, fontSize: "1vw", marginLeft: ".4vw", marginTop: ".6vh"
                          }} >3</div>
                          <div style={{ fontSize: window.innerWidth * 0.0105, width: "23vw", marginLeft: "1vw", lineHeight: '2.5vh' }}>
                            To keep the event professional we've disabled adding explicit songs.
                          </div>
                        </div>
                      </div>
                    </div>

                    :
                    <div style={{ padding: "1vh", fontSize: window.innerWidth * 0.0154, marginTop: window.innerHeight * 0.011, marginLeft: window.innerWidth * 0.007 }}>
                      <div style={{ height: '25vh' }}>
                        <div style={{ fontSize: window.innerWidth * 0.0145, height: "4.25vh" }}>
                          Results
                        </div>
                        {loading ?
                          <div style={{ fontSize: window.innerWidth * 0.01025, height: "1vh" }}>
                            {text}
                          </div>
                          :
                          <div style={{ fontWeight: 500, fontSize: window.innerWidth * 0.01025 }}>
                            Your search results will show here once you <a style={{ color: theme.palette.primary.main }}>hit enter</a>
                          </div>}
                      </div>
                    </div>
                  }
                  <img style={{
                    marginTop: '1.25vh',
                    width: 46.5 * .892 + 'vh',
                    height: 46.5 * 0.918 + 'vh',
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                    src="faded.png" />
                </div>
                :
                <div style={{
                  color: "#3d435a",
                  border: '.25vh solid ' + theme.palette.common.border,
                  borderRadius: window.innerHeight * .015,
                  backgroundColor: theme.palette.background.secondary,
                  width: window.innerWidth * 0.29,
                  height: window.innerHeight * 0.755,
                  marginTop: window.innerHeight * 0.02,
                }}>


                  <div style={{ padding: "1vh", fontSize: window.innerWidth * 0.0154, marginTop: window.innerHeight * 0.011, marginLeft: window.innerWidth * 0.007 }}>


                    <div style={{ fontSize: window.innerWidth * 0.0145, height: "4.25vh" }}>
                      Results
                    </div>

                    {loading ?
                      <div style={{ fontWeight: 500, fontSize: window.innerWidth * 0.01025, height: "1vh" }}>
                        {text}
                      </div>
                      :
                      <div style={{ fontWeight: 500, fontSize: window.innerWidth * 0.01025, height: "1vh" }}>
                        Explicit or recently added songs are grayed out.
                      </div>
                    }

                  </div>


                  <DisplayResults trackList={searchResults} theme={theme} />


                </div>
              }
            </div>
          </div>
        </Container>
        <Container style={{
          fontFamily: "'DM Sans', sans-serif", marginTop: window.innerHeight * .05,
        }}>

          <Container style={{
            border: '.25vh solid ' + theme.palette.common.border,
            borderRadius: window.innerHeight * .015,
            backgroundColor: theme.palette.background.secondary,
            height: window.innerHeight * 0.835,
            width: window.innerWidth * 0.4,
            overflowY: "hidden",
            marginTop: -window.innerHeight * .032,
            marginLeft: -window.innerHeight * .0,
            minWidth: window.innerWidth * .4748,
            overflowX: "hidden",
            fontFamily: "DM Sans"
          }}>


            <div style={{ marginLeft: -window.innerHeight * .02 }}>
              <div style={{ marginLeft: window.innerWidth * .012, marginTop: window.innerHeight * .026 }}>
                <div style={{ height: window.innerHeight * 0.3 }}>
                  <h2 style={{ color: theme.palette.text.primary, fontWeight: "1000", fontSize: window.innerWidth * 0.0167 }}>Now playing</h2>
                  {accessToken === "" ?
                    <h2 color={theme.palette.text.primary}>LOGIN TO SEE THE PLAYER</h2> :
                    <NowPlaying theme={theme} />
                  }
                </div>

                <div>
                  <h2 style={{ color: theme.palette.text.primary, marginTop: -window.innerHeight * 0.001, fontSize: window.innerWidth * 0.0147, height: "4vh", fontWeight: "1000" }}>Next up</h2>

                  <div style={{ marginTop: window.innerHeight * 0.0075, fontSize: window.innerWidth * 0.01, fontFamily: "DM Sans", fontWeight: "bold", color: theme.palette.text.primary, fontWeight: 500 }}>
                    <span style={{ marginLeft: window.innerWidth * 0.0065 }}> # </span>

                    {queueData.length < 20 ?
                      <span style={{ marginLeft: window.innerWidth * 0.018 }}> Title </span> :
                      <span style={{ marginLeft: window.innerWidth * 0.01875 }}> Title </span>}

                    <div style={{
                      borderTop: ".25vh solid " + theme.palette.common.border,
                      width: '100%',
                      marginTop: window.innerHeight * .00755,
                      height: window.innerHeight * .018
                    }} />
                  </div>


                  {queueData.length == 0 ?
                    <div style={{ opacity: "50%", color: theme.palette.text.primary, marginLeft: '.5vw', fontSize: window.innerWidth * 0.0147, height: "4vh", fontWeight: 300 }}>
                      Be the first to add a song to the queue!
                    </div>
                    :

                    <Queue trackList={queueData} theme={theme} />}

                </div>

              </div>
            </div>
          </Container>
        </Container>
      </div>
    </div>
  )
}

export default Dashboard;
