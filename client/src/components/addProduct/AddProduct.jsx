import React, { useState } from 'react'
import './addProduct.scss'
import io from 'socket.io-client';

const socket = io('http://localhost:8800');

const AddProduct = ({ setOpen }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startingBid, setStartingBid] = useState('');
    const [auctionDuration, setAuctionDuration] = useState('');
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))


    const handleCreateItem = () => {
        const newItem = {
            title,
            description,
            startingBid: Number(startingBid),
            auctionDuration: Number(auctionDuration),
        };

        // You might want to add more validation here before emitting the event

        socket.emit('createItem', { item: newItem, userId: currentUser._id });
    };
    return (
        <div className='addproduct'>
            <div className="container">
                <input type="file" />
                <input type="text" placeholder='title' name='title' onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='description' name='description' onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder='Starting Bid' name='startingBid' onChange={(e) => setStartingBid(e.target.value)} />
                <input type="number" placeholder='auctionDuration' name='auctionDuration' onChange={(e) => setAuctionDuration(e.target.value)} />
                {/* <input type="number" placeholder='endTime' name='endTime' /> */}
                <button type="button" onClick={handleCreateItem} >Add</button>
                <button onClick={() => setOpen(false)}>Close</button>
            </div>
        </div>
    )
}

export default AddProduct