import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard.js';
import Admin from "./Admin"
import Authorized from "./Authorized"
import History from "./History"
import React from "react";
import NavBar from "./NavBar"
import { Routes, Route } from "react-router-dom"
import HowToUse from './HowToUse';

function App() {
  return (
    <div style={{ display: 'inline-flex', width: "100%", overflow: "hidden", backgroundColor: "#f6f8fe", height: "100vh" }}>
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
    </div>
  )
}

export default App;
