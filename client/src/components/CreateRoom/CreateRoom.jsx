import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import "../../App.css"
import thinkGif from "../../assets/thinking-emoji.gif"
const roomId = nanoid(7)


 const CreateRoom = ({socket}) => {

    const { user } = useSelector((state) => state.user)


    const [copyButtonValue, setCopyButtonValue] = useState('Copy')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if(!user){
            window.location.href = '/'
        }
    })

    useEffect(() => {
        socket.emit('joinRoom', {username: user.userName, userId: user.userId, roomId})
    },[socket])

    useEffect(() => {
        socket.on('message', (payload) => {
            console.log(payload)
        })

        socket.on('message', (message) => {
            console.log(message)
        })
    })

    function copyText(){

        navigator.clipboard.writeText(roomId)

        setCopyButtonValue('Copied')
        setCopied(true)

        setInterval(() => {
            setCopyButtonValue('Copy')
            setCopied(false)

        }, 3000)

    }



  return (
    <>
    <div>
        <h1>Can You Outsmart the Grid?<img src={thinkGif} width={32} /></h1>
        <div>
            <div >
                <input value={roomId} type="text" disabled={true} />
                <button className="copy-code start-button" onClick={copyText}>{copyButtonValue}</button>
            </div>

            <div className="link-game">
                <Link to={`/game/${roomId}`}>
                    <button className="join-button" >PlayTime!</button>
                     </Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default CreateRoom
