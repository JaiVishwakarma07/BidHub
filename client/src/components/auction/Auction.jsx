import axios from 'axios';
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

const socket = io('http://localhost:8800');

const Auction = ({ item, userId }) => {
    const [currentBid, setCurrentBid] = useState(item.startingBid || 0);
    const [timeRemaining, setTimeRemaining] = useState(item.timeRemaining);
    // const [user, setUser] = useState({})
    // const id = item.ownerId !== undefined ? item.ownerId : userId

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const res = await axios.get(`http://localhost:8800/api/users/${id}`)
    //             // setUser(res.data);
    //             console.log(res.data)
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     fetchUser()
    // }, [])
    // console.log(item)

    useEffect(() => {
        // Listen for bid updates
        socket.on(`bidUpdate:${item._id}`, (newBid) => {
            setCurrentBid(newBid);
        });

        // Listen for time updates
        socket.on(`timeUpdate:${item._id}`, (newTime) => {
            setTimeRemaining(newTime);
        });

        return () => {
            socket.off(`bidUpdate:${item._id}`);
            socket.off(`timeUpdate:${item._id}`);
        };
    }, [item._id]);
    console.log(currentBid)
    const placeBid = () => {
        const newBid = currentBid + 100; // You may customize bid logic
        socket.emit('placeBid', { itemId: item._id, newBid, userId: userId });
    };
    console.log(item.bids)
    return (
        <div className="auction">
            <div className="left">
                <h1>{item.title}</h1>
                <img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iphone/iphone-14-pro-max-colors.png" alt="" />
                <div className="description">
                    <h1>Seller : {item.ownerId}</h1>
                    <h2>{item.description}</h2>
                </div>
            </div>
            <div className="right">
                <h1>Time Remaining : {timeRemaining}</h1>
                <hr />
                <div className="bids">
                    {/* {
                        item.bids.map(() => (
                            <span>Jai Vishwakarma bidded 100000</span>
                        ))
                    } */}
                </div>
                <div className="info">
                    <span>Staring Bid : 100000</span>
                    <span>Current Bid : 1000000</span>
                    <button onClick={placeBid} disabled={timeRemaining <= 0}>BID</button>
                </div>
            </div>
        </div>
    )
}

export default Auction