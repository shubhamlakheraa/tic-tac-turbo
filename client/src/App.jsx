import { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import { io } from "socket.io-client"
import Home from './components/Home/Home'
import CreateRoom from './components/CreateRoom/CreateRoom'
import JoinRoom from './components/JoinRoom/JoinRoom'
import Game from './components/Game/Game'
import Footer from './components/Footer/footer'

const API_URL = "https://tictacturbo.onrender.com"

const socket = io(API_URL)

function App() {

  

  return (
    <>
    

    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='createRoom' element={<CreateRoom socket={socket} />} />
        <Route path='joinRoom' element={<JoinRoom socket={socket} />} />
        <Route path='game/:roomId' element={<Game socket={socket} />} />
        <Route path='*' />
      </Routes>
    </Router>
    {/* <Footer /> */}
      
    </>
  );
}

export default App
