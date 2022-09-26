import { Link } from "react-router-dom"

const Home = (props) => {
    const {user} = props

    if (user === 'admin'){

    return(
        <div className="channel text-center">
            <h2>Welcome</h2>
            <h2>{user}</h2>
            <Link to={'/backendcontrols'}><button className="btn btn-success">Backend Controls</button></Link>
        </div>
    )
    }
    return(
        <div className="channel text-center">
        <h2>Welcome</h2>
        <h2>{user}</h2>
    </div>
)

}

export default Home