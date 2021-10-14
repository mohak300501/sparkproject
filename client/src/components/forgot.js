import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Forgot = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        email: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const forgot = () => {
        const { email } = user
        if (email) {
            fetch("/forgot", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({ email })
            })
                .then(res => {
                    res.json().then(data => {
                        alert(data.message)
                        if (!data.err) history.push("/reset")
                    })
                })
        } else {
            alert("Please enter your email.")
        }
    }

    return (
        <div className="flex full-height bg-violet flex-col jc-center">
            <div className="br ma w-40 bg-white flex ai-center flex-col">
                <div className="ma w-80">
                    <h1 className="color-violet">Forgot your password?</h1>
                    <p className="left">
                        Enter your email and we'll send you a 6-digit OTP to help you reset your password.<br />
                    </p>
                    <div className="ai-center flex">
                        <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" style={{width: "100%"}} />
                    </div><br />
                    <div className="button bg-violet color-white" onClick={forgot}>Send OTP</div><br />
                    <div className="ma">
                        <i className="ma cur-p underline" onClick={() => history.push("/login")}>Login</i>
                        &nbsp;or&nbsp;
                        <i className="ma cur-p underline" onClick={() => history.push("/register")}>Register</i>
                    </div><br/><br/>
                </div>
            </div>
        </div>
    )
}


export default Forgot