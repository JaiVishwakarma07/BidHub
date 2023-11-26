import React, { useEffect, useState } from 'react'
import './home.scss'
import Card from '../../components/Card/Card'
import AddProduct from '../../components/addProduct/AddProduct'
import newRequest from '../../utils/newRequest'

const dummyData = [
    {
        id: 1,
        title: "iPhone",
        desc: "This is an iPhone",
        startingBid: 100000,
        currentBid: 200000,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027204398'
    },
    {
        id: 2,
        title: "iPhone12",
        desc: "This is an iPhone",
        startingBid: 200000,
        currentBid: 300000,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027204398'
    },
    {
        id: 3,
        title: "iPhone13",
        desc: "This is an iPhone",
        startingBid: 110000,
        currentBid: 201000,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027204398'
    },
    {
        id: 4,
        title: "iPhone14",
        desc: "This is an iPhone",
        startingBid: 103000,
        currentBid: 203000,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027204398'
    }
    ,
    {
        id: 5,
        title: "iPhone",
        desc: "This is an iPhone",
        startingBid: 100000,
        currentBid: 200000,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027204398'
    },
    {
        id: 6,
        title: "iPhone12",
        desc: "This is an iPhone",
        startingBid: 200000,
        currentBid: 300000,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027204398'
    },
    {
        id: 7,
        title: "iPhone13",
        desc: "This is an iPhone",
        startingBid: 110000,
        currentBid: 201000,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027204398'
    },
    {
        id: 8,
        title: "iPhone14",
        desc: "This is an iPhone",
        startingBid: 103000,
        currentBid: 203000,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027204398'
    }
]

const Home = () => {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([])
    const [isloading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const fetchAllItems = async () => {
            try {
                const res = await newRequest.get('/items')
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
        <div className='home'>
            {open && <AddProduct setOpen={setOpen} />}
            <h1>Place your Bid to anyitems and make it yours</h1>
            <div className="add">
                <button onClick={() => setOpen(!open)}>Add a Product</button>
            </div>
            <div className="container">
                {
                    isloading ? "loading" : <div className="cards">
                        {
                            items.map((item) => <Card item={item} key={item._id} />)
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Home