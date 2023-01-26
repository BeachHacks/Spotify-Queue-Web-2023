import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard.js';
import Admin from "./Admin"
import Authorized from "./Authorized"
import History from "./History"
import React, { useState, useEffect, useContext, useMemo } from "react";
import NavBar from "./NavBar"
import { Routes, Route } from "react-router-dom"
import HowToUse from './HowToUse';
import LandingPage from "./LandingPage";
import { createContext } from 'react'
import io from 'socket.io-client';
import CustomSwitch from './CustomSwitch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefinition from './theme';

export const SocketContext = createContext(io(process.env.REACT_APP_API_URL));

function App() {

  const apiSocket = useContext(SocketContext);

  useEffect(() => {

    // Event Handlers
    apiSocket.on('id', (res) => {
      console.log('ID: ', res);
    });

    return () => {
      apiSocket.off('id');
      apiSocket.disconnect();
    };
  }, [])

  const [mode, setMode] = useState("light")
  const theme = useMemo(() => createTheme(themeDefinition(mode)), [mode])
  // console.log(theme)

  const handleSwitch = () => {
    setMode(mode === "light" ? "dark" : "light")
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'inline-flex', width: "100%", overflow: "hidden", backgroundColor: theme.palette.background.primary, height: "100vh" }}>
        <SocketContext.Provider value={apiSocket}>
          {(localStorage.getItem('visited') === null) && <LandingPage />}
          <NavBar theme={theme} mode={mode}>
            <div style={{ marginLeft: '1.8vw', marginTop: '50vh' }}>
              <span style={{ marginLeft: 0, paddingLeft: 0, marginRight: "1vw", color: theme.palette.text.primary }}>Theme</span>
              <CustomSwitch onChange={handleSwitch}></CustomSwitch>
            </div>
          </NavBar>
          <Routes>
            <Route path="/admin" element={<Admin />}>
            </Route>
            <Route path="/auth" element={<Authorized />}>
            </Route>
            <Route path="/" element={<Dashboard theme={theme} />}>
            </Route>
            <Route path="/history" element={<History theme={theme} />}>
            </Route>

            <Route path="/howtouse" element={<HowToUse theme={theme} />}>
            </Route>
          </Routes>
        </SocketContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App;
