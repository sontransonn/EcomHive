import mongoose from "mongoose"

const cardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const CARDS = mongoose.model("cards", cardSchema)

export default CARDS