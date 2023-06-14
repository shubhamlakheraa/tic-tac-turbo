import { useState } from 'react'
import '../App.css'
import InputName from '../components/PlayerOne'
import InputPlayer2 from "../components/PlayerTwo"

import Room from '../components/Room'

function HomePage() {

  const API_URL = "http://localhost:8000"

  const [isClicked, setIsClicked] = useState(false)
  const [isJoinClicked, setIsJoinClicked] = useState(false)
  const [roomID, setRoomID] = useState("") 


  
  const [user2, setUser2] = useState("")

  const [room2, setRoom2] = useState("")

  const [playerId, setPlayerId] = useState("")
  const [isConnected, setIsConnected] = useState(false)


  function handleclick(){
    props.setIsJoinClicked(!props.isJoinClicked)
}

const handleJoinRoom = async () => {

    const requestBody = { username: user2 }

    try{
        const response = await fetch(`${API_URL}/api/room/${room2}/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        if(response.ok) {
            
            console.log("Added")
            

        }
        else{
            console.log('Failed to get you in.')
        }
    }
    catch(error){
        console.log("Error", error.message)
    }
}
  
function handleclick(){
  setIsClicked(!isClicked)
}

function handleJoinClick(){
  setIsJoinClicked(!isJoinClicked)
  
}

const areBothClicked = !isClicked && !isJoinClicked


  return (
    <>
      <div>
        {isClicked && <InputName setIsClicked={setIsClicked} isClicked={isClicked} roomID={roomID} setRoomID={setRoomID} />}
        {/* {isJoinClicked && <InputPlayer2 setIsJoinClicked={setIsJoinClicked} isJoinClicked={isJoinClicked} roomID={roomID} />} */}
        {areBothClicked && (
          <div>
          <div>
             <h1>Tic Tac Toe</h1>
           </div>
   
           <div className='button-container'>
             <button onClick={handleclick} className="start-button">Start Now</button>
             <button onClick={handleJoinClick} className='join-button'>Join Game</button>
           </div>
           </div>

        )}

        {isJoinClicked && (
          <div>
            <div>
            <h1>
                Player Name 2
            </h1>
            <div className="input-container">
                
                <input 
                className="input-name" 
                placeholder="Player Name"
                value={user2}
                onChange={(e) => setUser2(e.target.value)}
                 />
                
                <input 
                className="input-name" 
                placeholder="Enter Code"
                value={room2}
                onChange={(e) => setRoom2(e.target.value)}
                />
         
            </div>
           
            <div className="button-container">
            <button onClick={handleclick} className='join-button'>
                Back
            </button>
            <button onClick={handleJoinRoom} className="start-button">
                Let's Go
            </button>
            </div>

            {playerId && (
                <div>
                    <p>User joined the room</p>
                    </div>
            )}
            {isConnected && (
                <Link to="/play-game"><button>Play Game</button></Link>
            )}
           
        </div>
          </div>
        )}
       
        
         
        
      </div>
    </>
  );
}

export default HomePage
