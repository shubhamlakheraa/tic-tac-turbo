import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import "../../App.css"
const JoinRoom = ({socket}) => {

    const { user } = useSelector((state) => state.user)

    const [joined, setJoined] = useState(false)


    const [roomId, setRoomId] = useState('')
    const [error, setError] = useState('')

    const handleClick = () => {

        if(roomId.length === 0){
            setError('Plese enter room id')
            setTimeout(() => {
                setError('')
            }, 4000)
            return 
        }

        socket.emit('joinExistingRoom', {username: user.userName, userId: user.userId, roomId})
    }

    useEffect(() => {
        if(!user){
            window.location.href = '/'
        }

        socket.on('message', (payload) => {
            console.log(payload)
            if(payload.error){
                setError(payload.error)
                setTimeout(() => {
                    setError('')
                },4000)
            }
            else{
                setJoined(true)
            }
        })
    })




  return (
    <>
    <div>
        <h1>Are You Ready to Conquer the Grid?</h1>

        <div>
            <div className='join-container'>
                {error.length > 0 ? <p>{error}</p> : null }
                <div>
                <input value={roomId} onChange={(e) => setRoomId(e.target.value)} type="text" placeholder='Room Id ?' />
                </div>
                
                <div>
                <button disabled={joined} onClick={handleClick} className='start-button'> {joined ? 'Joined': 'Join'}</button>
                </div>
                
            </div>
            <div>
                {
                    joined ? <div className='battle-div'><Link to={`/game/${roomId}`}>
                        <button className='join-button'>Enter the Battle Arena!</button>
                    </Link></div> : null
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default JoinRoom