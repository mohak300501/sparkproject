import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        inst: "",
        dept: "",
        year: "",
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

    const register = () => {
        const { name, email, phone, gender, inst, dept, year, password, confirmPassword } = user
        if (name && email && phone && gender && inst && dept && year && password && confirmPassword) {
            if (password === confirmPassword) {
                fetch("/register", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({ name, email, phone, gender, inst, dept, year, password })
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
                <h1>Login instead</h1><br />
                <p>If you have already registered, please login.</p><br />
                <div className="button bg-white color-violet" onClick={() => history.push("/login")}>Login</div>
            </div>
            {/* {console.log("User", user)} */}
            <div className="flex-70 bg-white color-violet">
                <h1>Register</h1>
                <div className="ai-center flex flex-col row-gap-07">
                    <input type="text" name="name" value={user.name} placeholder="Enter your Name" onChange={handleChange} />
                    <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange} />
                    <input type="number" name="phone" value={user.phone} placeholder="Enter your Mobile number" onChange={handleChange} />
                    <select name="gender" value={user.gender}>
                        <option selected disabled value="DEFAULT">Choose gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <select name="inst" value={user.inst}>
                        <option selected disabled value="DEFAULT">Choose institute</option>
                        <option value="IITs/IISc">IITs/IISc</option>
                        <option value="NITs/IISERs/NISER/IIEST/UM-DAECBS">NITs/IISERs/NISER/IIEST/UM-DAECBS</option>
                        <option value="Other institute">Other institute</option>
                    </select>
                    <select name="dept" value={user.dept}>
                        <option selected disabled value="DEFAULT">Choose department</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechanical &amp; Industrial">Mechanical &amp; Industrial</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                    </select>
                    <select name="year" value={user.year}>
                        <option selected disabled value="DEFAULT">Choose year of study</option>
                        <option value="IInd year">IInd year</option>
                        <option value="IIIrd year">IIIrd year</option>
                        <option value="IV year (only for 5 year courses)">IV year (only for 5 year courses)</option>
                    </select>
                    <input type="password" name="password" value={user.password} placeholder="Set Password" onChange={handleChange} />
                    <input type="password" name="confirmPassword" value={user.confirmPassword} placeholder="Confirm Password" onChange={handleChange} />
                </div><br />
                <div className="button bg-violet color-white" onClick={register} >Register</div>
            </div>
        </div>
    )
}

export default Register