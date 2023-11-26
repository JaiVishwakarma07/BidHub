import React from 'react'
import './card.scss'
import { Link } from 'react-router-dom'

const Card = ({ item }) => {
    return (
        <Link to={`./singleItem/${item._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            <div className="card">
                <img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iphone/iphone-14-pro-max-colors.png" alt="" />
                <div className="info">
                    <div className="title">
                        <span>{item.title}</span>
                    </div>
                    <p>{item.desc}</p>
                </div>
                <hr />
                <div className="details">
                    <div className="price">
                        <span>Starting Bid</span>
                        <h2>₹{item.startingBid}</h2>
                    </div>
                    <div className="price">
                        <span>Current Bid</span>
                        <h2>₹{item.currentBid}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card