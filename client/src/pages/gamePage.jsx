import {useState, useEffect } from "react"
import socket from "../socket"
import Board from "../components/Game/Board"
import Info from "../components/Game/Info"
import "../css/app2.css"
import "../css/index2.css"
const GamePage = () => {

    const [reset, setReset] = useState(false)

    const [winner, setWinner] = useState('')

    const resetBoard = () => {
        setReset(true)
    }

    // const [socket, setSocket] = useState(null)

    useEffect(() => {

        
        // setSocket(socket)

        socket.on('connect', (data) => {
            
            console.log(`User with ID ${data} has joined the room.`);
          });
 
        // return () => {
        //     socket.disconnect()
        // }
    }, [])

    return (
        <>
        <div className="App">
            <div className={`winner ${winner !== '' ? '' : 'shrink'}`}>
                <div className="winner-text">
                    {winner}
                </div>
                <button onClick={() => resetBoard()}></button>
            </div>
            <Board reset={reset} setReset={setReset} winner={winner} setWinner={setWinner} />
            <Info />


        </div>
        </>
    )
}

export default GamePage 