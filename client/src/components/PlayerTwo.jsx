import {useState, useEffect} from "react"
import "../App.css"
import io from "socket.io-client"
import { Link } from "react-router-dom"
const InputPlayer2 = (props) => {

    const API_URL = "http://localhost:8000"

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

    return (
        <>
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
        </>
    )
}

export default InputPlayer2