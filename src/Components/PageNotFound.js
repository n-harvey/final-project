import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return(
        <div className="notFound h-100">
            <h2>Error 404</h2>
            Page Not Found
            <br></br>
            <Link to="/">
            <button>Go Back</button>
            </Link>
        </div>
    )
}

export default PageNotFound