// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import './App.css'; // Import your CSS file here

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />  {/* Route for creating a new document */}
      <Route path="/editor/:id" element={<Editor />} />  {/* Route for editing an existing document */}
    </Routes>
  );
}

export default App;
