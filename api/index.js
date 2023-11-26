import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import itemRoute from './routes/item.route.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import Item from './models/item.model.js'
import User from './models/user.model.js'


const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})
dotenv.config()
mongoose.set('strictQuery', true)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("connected")
    } catch (err) {
        console.log(err);
    }
}

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
// app.use("/api/item", itemRoute)

////////////////////////

app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/items/single/:id', async (req, res) => {
    try {
        const items = await Item.findById(req.params.id);
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/items', async (req, res) => {
    const newItem = req.body;

    try {
        const createdItem = await Item.create({
            ...newItem,
            endTime: new Date(Date.now() + newItem.auctionDuration * 1000),
        });
        io.emit('newItem', createdItem);

        // Start the auction timer
        startAuctionTimer(createdItem);

        res.json(createdItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// WebSocket handling for bid updates and time updates
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('placeBid', async ({ itemId, newBid, userId }) => {
        try {
            const item = await Item.findById(itemId);
            const timeRemaining = Math.ceil((item.endTime - new Date()) / 1000);
            console.log(newBid)
            if (newBid > item.startingBid && timeRemaining > 0) {
                item.bids.push({ userId, bidAmount: newBid });
                console.log(newBid)
                item.startingBid = newBid;
                await item.save();
                io.emit(`bidUpdate:${itemId}`, newBid);
            }
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    });



    // Function to start the auction timer
    const startAuctionTimer = (item) => {
        const timer = setInterval(() => {
            const timeRemaining = Math.ceil((item.endTime - new Date()) / 1000);
            io.emit(`timeUpdate:${item.id}`, timeRemaining);

            if (timeRemaining <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    };

    // ... (previous code)

    socket.on('createItem', async ({ item, userId }) => {
        try {
            // Assuming you have a User model for user details
            const user = await User.findById(userId);

            if (!user) {
                console.error('User not found');
                return;
            }

            // You might want to add more validation and handle user permissions here

            const newItem = await Item.create({
                ...item,
                ownerId: userId, // or any other identifier for the seller
                endTime: new Date(Date.now() + item.auctionDuration * 1000),
            });

            io.emit('newItem', newItem);

            // Start the auction timer
            startAuctionTimer(newItem);
        } catch (error) {
            console.error('Error creating item:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


/////////////////////////


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";

    return res.status(errorStatus).send(errorMessage)
})

httpServer.listen(8800, () => {
    connect();
    console.log("api working")
})