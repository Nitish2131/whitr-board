import { useState } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Collab } from './pages/Collab';
import { Realtime } from './pages/Realtime';
import Test from './pages/Test';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< Test/>} />
      <Route path="/realtime" element={< Realtime/>} />
      <Route path="/collab" element={< Collab/>} />

    </Routes>
  </BrowserRouter>
    
  )  
}

export default App
