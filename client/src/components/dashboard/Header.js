import React, { useEffect, useState } from 'react'
import {Navbar} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'

const Header = ({isLoggedin, setIsLoggedin}) => {
    
    const history = useHistory()

    useEffect(() => {
        const info = JSON.parse(sessionStorage.getItem('info'))
        if(info) {
            document.getElementById('isLoggedin').innerText = 'Log out'
            setIsLoggedin(true)
        } else {
            document.getElementById('isLoggedin').innerText = 'Log in'
            setIsLoggedin(false)
        }
    }, [isLoggedin])

    const logout = e => {
        if(isLoggedin) {
            sessionStorage.removeItem('info')
            sessionStorage.removeItem('token')
            setIsLoggedin(false)
        }
    }

    return (
        <div className="container">
            <Navbar bg="dark" expand="lg" className="d-flex justify-content-between">
                <div className="col-4">
                <Link to="/" className="text-white">Home</Link>
                </div>
                <div className="col-8 d-flex justify-content-end ">
                <Link to="/posts" className="col-2 text-white">Posts</Link>
                <Link to="/movies" className="col-2 text-white">Movies</Link>
                <Link to="/login" className="col-2 text-white" id="isLoggedin" onClick={logout}></Link>
                </div>
            </Navbar>
        </div>
    )
}

export default Header
