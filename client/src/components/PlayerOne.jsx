import {useState, useEffect} from "react"
import "../App.css"
import { Link } from "react-router-dom"
import io from "socket.io-client"

const InputName = (props) => {

    const API_URL = "http://localhost:8000"

    const [username, setUsername] = useState("")
    const [playerId, setPlayerId] = useState("")
    const [isConnected, setIsConnected] = useState(false)


    function handleclick(){
        props.setIsClicked(!props.isClicked)
    }

    const handleGenerateLink = async () => {

        

        const requestBody = { requestingUser: username}

        try{
            const response = await fetch(`${API_URL}/api/generate-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            })
            if(response.ok) {
                const { roomID } = await response.json()
                props.setRoomID(roomID)
               
            }
            else{
                console.log('Failed to generate room code')
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
                Player Name
            </h1>
            <div className="input-container">
            <input className="input-name" type="text" value={username} 
            onChange={(e) => setUsername(e.target.value)} placeholder="Enter UserName" />
         
            </div>
           
            <div className="button-container">
            <button onClick={handleclick} className='join-button'>
                Back
            </button>
           <button className="start-button" onClick={handleGenerateLink}>Let's Go
            </button>
          
            </div>
            {props.roomID && (
                <div>
                    <h3>Generated RoomId is : {props.roomID}</h3>
                    </div>
            )}

            {playerId && (
                <div>
                    <p>User joined the room at {playerId}</p>
                    </div>
            )}
            {isConnected && (
                <Link to="/play-game"><button>Play Game</button></Link>
            )}

           
        </div>
        </>
    )
}

export default InputName