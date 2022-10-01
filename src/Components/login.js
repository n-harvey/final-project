import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row } from 'react-bootstrap'

function Login(props)  {
    const { log, user, users } = props
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [invalid, setInvalid] = useState(false)
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
                console.log('setting setInvalid to true')
                setPassword('')
                setUsername('')
            }
        }
        else{
            console.log('setting setInvalid to true')
            setInvalid(true)
            setPassword('')
            setUsername('')
        }
    }

    const newAccount = (event) => {
        event.preventDefault()
        navigate('/create')
    }

    const enter = (e) => {
        if (e.code === 'Enter'){
            console.log('enter was pressed')
            document.getElementById('login').click()
        }
    }
    if(invalid) {
        console.log(invalid)
    return(
        <>
        <div className="">
            <Row className="mx-0">
            <Col className="text-white align-self-center text-center fs-3 fw-bold">
                <div>
                    Welcome<br></br> To <br></br>Flack
                </div>
            </Col>
            <Col className="text-center pt-2 pb-2">
            <div>
            <input type="text" placeholder="Username" onChange={handleUserChange} onKeyDown={enter} value={userName}></input> <br />
            <input type="password" placeholder="Password" onChange={handlePassChange} onKeyDown={enter} value={password}></input> <br />
            </div>
            <Button className="w-100 mb-1 btn-success" id='login'onClick={login}>Login</Button>
            <Button className="w-100" onClick={newAccount}>Create New Account</Button>
            </Col>
            </Row>
            <Alert className="text-center"variant={'danger'} onClose={() => setInvalid(false)} dismissible>
                Invalid Username / Password
            </Alert>
        </div> 
        </>
)}
    return(
            <>
            <div className="">
                <Row className="mx-0">
                <Col className="text-white align-self-center text-center fs-3 fw-bold">
                    <div>
                        Welcome<br></br> To <br></br>Flack
                    </div>
                </Col>
                <Col className="text-center pt-2 pb-2">
                <div>
                <input type="text" placeholder="Username" onChange={handleUserChange} onKeyDown={enter} value={userName}></input> <br />
                <input type="password" placeholder="Password" onChange={handlePassChange} onKeyDown={enter} value={password}></input> <br />
                </div>
                <Button className="w-100 mb-1 btn-success" id='login'onClick={login}>Login</Button>
                <Button className="w-100" onClick={newAccount}>Create New Account</Button>
                </Col>
                </Row>
            </div> 
            </>
    )
}

export default Login