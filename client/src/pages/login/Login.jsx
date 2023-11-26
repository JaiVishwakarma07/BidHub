import React, { useState } from 'react'
import './login.scss'
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsename] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await newRequest.post("/auth/login", { username, password }, { withCredentials: true })
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/")
        } catch (err) {
            setError(err.respons.data)
        }
    }
    return (
        <div className='login'>
            <form onSubmit={handleSubmit} className="container">
                <h1>Login</h1>
                <input type="text" placeholder='Username' onChange={e => setUsename(e.target.value)} />
                <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <button type="submit">login</button>
                {error && error}
                <span className='prompt'>Not having account? <span className='inner'>signUp</span></span>
            </form>
        </div>
    )
}

export default Login