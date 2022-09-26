import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

function Login(props)  {
    const { log, user, users } = props
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handlePassChange = (event) => {
        setPassword(event.target.value)
    }

    const handleUserChange = (event) => {
        setUsername(event.target.value)
    }


    const login = (event) =>{
        console.log('Log in button, logging users', users)
        event.preventDefault()
        console.log('Attempting log in')
        console.log(userName, password)
        console.log('Is username found', users.find(user => user.username ===  userName))
        if(users.find(user => user.username === userName)){
            if(users.find(user => user.username === userName).password === password){
            log(true)
            user(userName)
            }
            else{
                setPassword('')
                setUsername('')
            }
        }
        else{
            setPassword('')
            setUsername('')
        }
    }

    const newAccount = (event) => {
        event.preventDefault()
        navigate('/create')
    }

    return(
        <div className="login-form">
            <form className="text-center">
                <input type="text" placeholder="Username" onChange={handleUserChange} value={userName}></input> <br />
                <input type="password" placeholder="Password" onChange={handlePassChange} value={password}></input> <br />
                <Button onClick={login}>Login</Button>
                <br />
                <br></br>
                <Button onClick={newAccount}>Create New Account Here</Button>
            </form>
        </div>
    )
}

export default Login