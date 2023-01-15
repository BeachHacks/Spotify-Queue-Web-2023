import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard.js';
import Admin from "./Admin"
import Authorized from "./Authorized"
import History from "./History"
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar"
import { Routes, Route } from "react-router-dom"
import HowToUse from './HowToUse';
import LandingPage from "./LandingPage";
import { createContext } from 'react'
import io from 'socket.io-client';

export const SocketContext = createContext({});

function App() {

  const [apiSocket, setApiSocket] = useState(null);

  useEffect(() => {
    // Create Socket
    const socket = io(process.env.REACT_APP_API_URL);
    setApiSocket(socket);
    
    // Event Handlers
    socket.on('id', (res) => {
      console.log('ID: ', res);
    });

    return () => {
      socket.off('id');
      socket.disconnect();
    };
  }, [])

  return (
    <div style={{ display: 'inline-flex', width: "100%", overflow: "hidden", backgroundColor: "#f6f8fe", height: "100vh" }}>
    <SocketContext.Provider value={apiSocket}>
    <LandingPage/>
      <NavBar />
      <Routes>
        <Route path="/admin" element={<Admin />}>
        </Route>
        <Route path="/auth" element={<Authorized />}>
        </Route>
        <Route path="/" element={<Dashboard />}>
        </Route>
        <Route path="/history" element={<History />}>
        </Route>

        <Route path="/howtouse" element={<HowToUse />}>
        </Route>
      </Routes>
    </SocketContext.Provider>
    </div>
  )
}

export default App;
