import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Reset = () => {

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

    const reset = () => {
        const { email, password } = user
        if (email && password) {
            fetch("/reset", {
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
                        history.push("/")
                    })
                })
        } else {
            alert("Please enter both your email and password.")
        }
    }

    return (
        <div className="flex full-height">
            <div className="flex-70">
                <h1 className="color-violet">reset to your account</h1><br/>
                <p className="left ma w-40">
                    Dear SPARK team, here are test credentials for trial reset as below -<br/>
                    Email - mohak_k@ph.iitr.ac.in<br/>
                    Password - mohakmonger<br/>
                </p><br/>
                <div className="ai-center flex flex-col row-gap-07">
                    <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" />
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" />
                </div><br/>
                <div className="button bg-violet color-white" onClick={reset}>reset</div><br/>
                <p className="ma" onClick={() => history.push("/forgot")}>Forgot password?</p>
            </div><br/>
            <div className="flex-30 bg-violet color-white">
                <h1>Hello students!</h1><br/>
                <p>If you have not registered yet, please do so.</p><br/>
                <div className="button bg-white color-violet" onClick={() => history.push("/register")}>Register</div>
            </div>
        </div>
    )
}


export default Reset