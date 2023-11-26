import React from 'react'
import './navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout")
            localStorage.setItem("currentUser", null)
            navigate("/login")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='navbar'>
            {/* <div className="container"> */}
            <div className="left">
                <h1>Bid<span>HUB</span></h1>
            </div>
            <div className="middle">
                <img src="https://www.freeiconspng.com/uploads/search-icon-png-2.png" alt="" />
                <input type="text" placeholder='Search' />
            </div>
            <div className="right">
                <Link className='link' to="./MyItems">Products</Link>
                <Link className='link' to="./MyItems">Orders</Link>
                <Link className='link' to="./MyItems">Bids</Link>
                <button className='link' onClick={handleLogout}>Logout</button>
                <div className="profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-bmqm7mCI2OBNsFo6PDo9QD3NPzXnpn9vA&usqp=CAU" alt="" />
                    <h2>Jai</h2>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Navbar