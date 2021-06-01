import React from 'react'
import {Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className="container">
            <Navbar bg="dark" expand="lg" className="d-flex justify-content-between">
                <div className="col-4">
                <Link to="/" className="text-white">Home</Link>
                </div>
                <div className="col-8 d-flex justify-content-end ">
                <Link to="/posts" className="col-2 text-white">Posts</Link>
                <Link to="/movies" className="col-2 text-white">Movies</Link>
                <Link to="/login" className="col-2 text-white">Log in</Link>
                </div>
            </Navbar>
        </div>
    )
}

export default Header
