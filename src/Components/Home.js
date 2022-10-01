import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap'

const Home = (props) => {
    const {user, deleteUser} = props

    if (user === 'admin'){

    return(
        <div className="channel text-center home">
            <h2>Welcome</h2>
            <h2>{user}</h2>
            <Link to={'/backendcontrols'}><button className="btn btn-success">Backend Controls</button></Link>
        </div>
    )
    }
    return(
        <div className="channel text-center home">
        <h2>Welcome</h2>
        <h2>{user}</h2>
        <Button className="btn btn-danger" onClick={()=>deleteUser({user})}>Delete User</Button>
    </div>
)

}

export default Home