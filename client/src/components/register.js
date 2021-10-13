import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        const host_addr = (process.env.HOST_ADDR) ?
            process.env.HOST_ADDR + "register" : "http://localhost:5000/register"
        console.log(host_addr)

        if (name && email && password && reEnterPassword) {
            if (password === reEnterPassword) {
                fetch(host_addr, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({ name, email, password })
                })
                    .then(res => {
                        res.json().then(data => {
                            alert(data.message)
                            if (!data.err ) history.push("/login")
                        })
                    })
            } else {
                alert("Passwords do not match.")
            }
        } else {
            alert("Please fill all the fields.")
        }

    }

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange} />
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange} />
            <input type="password" name="password" value={user.password} placeholder="Set Password" onChange={handleChange} />
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} />
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register