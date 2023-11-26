import React, { useEffect, useState } from 'react'
import './item.scss'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client';
import Auction from '../../components/auction/Auction';
import newRequest from '../../utils/newRequest';

const socket = io('http://localhost:8800');

const Item = () => {
    const { id } = useParams()
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [items, setItems] = useState([])
    const [isloading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const fetchAllItems = async () => {
            try {
                const res = await newRequest.get(`/items/single/${id}`)
                setItems(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllItems()
        setLoading(false)
    }, [])

    // console.log(items)


    return (
        <div className='item'>
            {isloading ? "loading" : <Auction item={items} userId={currentUser._id} />}
        </div>
    )
}

export default Item