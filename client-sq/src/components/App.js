import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard.js';
import Admin from "./Admin"
import Authorized from "./Authorized"
import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />}>
        </Route>
        <Route path="/auth" element={<Authorized />}>
        </Route>
        <Route path="/" element={<Dashboard />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
