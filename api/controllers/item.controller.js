import Item from "../models/item.model.js"
import createError from "../utils/createError.js"


// app.post('/api/items', async (req, res) => {
//     const newItem = req.body;

//     try {
//       const createdItem = await Item.create({
//         ...newItem,
//         endTime: new Date(Date.now() + newItem.auctionDuration * 1000),
//       });
//       io.emit('newItem', createdItem);

//       // Start the auction timer
//       startAuctionTimer(createdItem);

//       res.json(createdItem);
//     } catch (error) {
//       console.error('Error creating item:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   // WebSocket handling for bid updates and time updates
//   io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('placeBid', async ({ itemId, newBid, userId }) => {
//       try {
//         const item = await Item.findById(itemId);
//         const timeRemaining = Math.ceil((item.endTime - new Date()) / 1000);

//         if (newBid > item.startingBid && timeRemaining > 0) {
//           item.bids.push({ userId, bidAmount: newBid });
//           item.startingBid = newBid;
//           await item.save();
//           io.emit(`bidUpdate:${itemId}`, newBid);
//         }
//       } catch (error) {
//         console.error('Error placing bid:', error);
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

//   // Function to start the auction timer
//   const startAuctionTimer = (item) => {
//     const timer = setInterval(() => {
//       const timeRemaining = Math.ceil((item.endTime - new Date()) / 1000);
//       io.emit(`timeUpdate:${item.id}`, timeRemaining);

//       if (timeRemaining <= 0) {
//         clearInterval(timer);
//       }
//     }, 1000);
//   };





export const createItem = async (req, res, next) => {
    const newItem = new Item({
        userId: req.userId,
        ...req.body,
    })

    try {
        const saveItem = await newItem.save();
        res.status(201).json(saveItem);
    } catch (err) {
        next(err)
    }
}

export const deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item.userId !== req.userId) return next(createError(403, "delete only yours"));
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).send("Item deleted");
    } catch (error) {
        next(error)
    }
}

export const getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) next(createError(404, "Item not found"));
        res.status(200).send(item)

    } catch (error) {
        next(error)
    }

}

export const getItems = async (req, res, next) => {
    try {
        const Item = await Item.find()
        res.status(200).send(Item)

    } catch (error) {
        next(error)
    }
}