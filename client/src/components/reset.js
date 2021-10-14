import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Reset = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        otp: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const reset = () => {
        const { otp, password, confirmPassword } = user
        const email = localStorage.getItem('email')
        const sent_otp = localStorage.getItem('otp')
        if (otp && password && confirmPassword) {
            if (otp === sent_otp) {
                if (password === confirmPassword) {
                    fetch("/reset", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify({ email, otp, password })
                    })
                        .then(res => {
                            res.json().then(data => {
                                localStorage.removeItem('email')
                                localStorage.removeItem('otp')
                                alert(data.message)
                                history.push("/login")
                            })
                        })
                } else {
                    alert("Passwords don't match.")
                }
            } else {
                alert("Incorrect OTP.")
            }
        } else {
            alert("Please fill all the fields.")
        }
    }

    return (
        <div className="flex full-height bg-violet flex-col jc-center">
            <div className="br ma w-40 bg-white flex ai-center flex-col">
                <div className="flex-70">
                    <h1 className="color-violet">Reset password</h1><br />
                    <div className="ai-center flex flex-col row-gap-07">
                        <input type="text" name="otp" value={user.otp} onChange={handleChange} placeholder="Enter the OTP" />
                        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter new Password" />
                        <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                    </div><br />
                    <div className="button bg-violet color-white" onClick={reset}>Reset</div><br />
                </div>
            </div>
        </div>
    )
}


export default Reset