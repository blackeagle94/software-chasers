import React from 'react'
import GoogleMaps from './GoogleMaps'
import ReactGoogleMaps from './ReactGoogleMaps'

const HomePage = () => {
    return (
        <div className="d-flex justify-content-center flex-column mt-2">
            <h1 className="d-flex justify-content-center">Welcome to Backend Workspace</h1>
            <GoogleMaps />
            {/* <ReactGoogleMaps /> */}
        </div>
    )
}

export default HomePage
