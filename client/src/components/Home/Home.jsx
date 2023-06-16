import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addUser } from "../../Actions"
import {nanoid} from "nanoid"
import myImage from "../../assets/tici.jpg"
import "../../App.css"
import "./Home.css"
import Footer from "../Footer/footer"

export default function Home(){

    const userId = nanoid(5)

    const [userName, setUserName] = useState('')
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    const handleClick = () => {
        if(userName === ''){
            setError('Please enter your name')
            setTimeout(() => {
                setError('')
            }, 4000)
            return 
        }

        dispatch(addUser(userName, userId))

        setShow(true)
    }


    return (
        <>
        <div>
            <div>
        <button data-text="Awesome" className="button">
    <h2 className="actual-text">&nbsp;TicTacTurbo&nbsp;</h2>
    <h2 className="hover-text" aria-hidden="true">&nbsp;TicTacTurbo&nbsp;</h2>
</button>
</div>
            {/* <h1>Tic Tac Turbo</h1> */}
            <img src={myImage} className="ticimg" width={450}  />

            {error.length > 0 ? <p>{error}</p>: null}

            {
                !show ? <>
                <div className="name-block">
                <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Please Enter your Name" />
                <button className="inp-button join-button" onClick={handleClick}>Let's Go</button>
                </div>
                </> : null
            }

            {
                show &&
                <div>
                    <div className="button-container">
                        <Link to="/createRoom">
                            <button className="start-button">Invite Friend</button>
                        </Link>
                        <Link to="/joinRoom">
                            <button className="join-button">Join Room</button>
                        </Link>
                    </div>
                </div>
            }


        </div>
        <Footer />
        </>
    )
}