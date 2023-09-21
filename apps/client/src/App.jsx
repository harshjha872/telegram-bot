// import { useEffect } from 'react'
import "./App.css";
// import axios from "axios";
// import { GoogleLogin } from "@react-oauth/google";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
