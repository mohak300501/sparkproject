import React from "react"

const Home = ({ updateUser }) => {
    return (
        <div className="homepage">
            <h1>Welcome to SPARK authentication portal.</h1>
            <div className="button" onClick={() => updateUser({})} >Logout</div>
        </div>
    )
}

export default Home