import { useState } from 'react'
import './App.css'
import InputName from './components/PlayerOne'
import InputPlayer2 from "./components/PlayerTwo"
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import Room from './components/Room'
import HomePage from './pages/HomePage'
import GamePage from './pages/gamePage'

function App() {


  return (
    <>
      <div>
  
        <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
        <Route path="/api/generate-code" element={<Room />} />
        <Route path="/play-game" element={<GamePage />} />
        </Routes>
        </Router>
        
        
         
        
      </div>
    </>
  );
}

export default App
