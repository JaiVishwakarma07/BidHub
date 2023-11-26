import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema({
    ownerId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startingBid: {
        type: Number,
        required: true,
    },
    auctionDuration: {
        type: Number,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    bids: [
        {
            userId: {
                type: String
            },
            bidamount: {
                type: Number
            }
        }
    ]
},
    { timestamps: true }
);

export default mongoose.model("Item", itemSchema)
