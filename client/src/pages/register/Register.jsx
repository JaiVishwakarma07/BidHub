import React, { useState } from 'react'
import './register.scss'
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        img: "",
    })

    const handleChange = (e) => {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await newRequest.post("/auth/register", user)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login'>
            <form className="container" onSubmit={handleSubmit}>
                <h1>Welcome to <span className='title'>BidHub</span></h1>
                <input type="text" placeholder='Username' name='username' onChange={handleChange} />
                <input type="email" placeholder='Email' name='email' onChange={handleChange} />
                <input type="password" placeholder='Password' name='password' onChange={handleChange} />
                <input type="file" name='img' />
                <button>Register</button>
                <span className='prompt'>Already having account? <span className='inner'>Login</span></span>
            </form>
        </div>
    )
}

export default Register