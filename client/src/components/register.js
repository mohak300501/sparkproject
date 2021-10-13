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
        if (name && email && password && reEnterPassword) {
            if (password === reEnterPassword) {
                fetch("/register", {
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
                            if (!data.err) history.push("/login")
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
        <div className="flex full-height">
            <div className="flex-30 bg-violet color-white">
                <h1>Login instead</h1><br/>
                <p>If you have already registered, please login.</p><br/>
                <div className="button bg-white color-violet" onClick={() => history.push("/login")}>Login</div>
            </div>
            {/* {console.log("User", user)} */}
            <div className="flex-70 bg-white color-violet">
                <h1>Register</h1>
                <div className="ai-center flex flex-col row-gap-07">
                    <input type="text" name="name" value={user.name} placeholder="Enter your Name" onChange={handleChange} />
                    <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange} />
                    <input type="number" name="phone" value={user.phone} placeholder="Enter your Mobile number" onChange={handleChange} />
                    <select>
                        <option default>Choose gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <select>
                        <option default>Choose institute</option>
                        <option>IITs/IISc</option>
                        <option>NITs/IISERs/NISER/IIEST/UM-DAECBS</option>
                        <option>Other institute</option>
                    </select>
                    <select>
                        <option default>Choose department</option>
                        <option>Architecture</option>
                        <option>Biotechnology</option>
                        <option>Chemistry</option>
                        <option>Computer Science</option>
                        <option>Electrical</option>
                        <option>Mechanical &amp; Industrial</option>
                        <option>Mathematics</option>
                        <option>Physics</option>
                    </select>
                    <select>
                        <option default>Choose year of study</option>
                        <option>IInd year</option>
                        <option>IIIrd year</option>
                        <option>IV year (only for 5 year courses)</option>
                    </select>
                    <input type="password" name="password" value={user.password} placeholder="Set Password" onChange={handleChange} />
                    <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} />
                </div><br/>
                <div className="button bg-violet color-white" onClick={register} >Register</div>
            </div>
        </div>
    )
}

export default Register