// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Brand from "./components/Brand";
import Community from "./components/Community";
import Qna from "./components/Qna";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/community" element={<Community />} />
          <Route path="/qna" element={<Qna />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
