import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Login = ({ updateUser }) => {

    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const { email, password } = user
        fetch("https://sparkauthproject.herokuapp.com/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                res.json().then(data => {
                    alert(data.message)
                    updateUser(data.user)
                    history.push("/")
                })
            })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Your Email" required />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Your Password" required />
            </form>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}


export default Login