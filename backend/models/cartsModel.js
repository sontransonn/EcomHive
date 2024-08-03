import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
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

const CARTS = mongoose.model("carts", cartSchema)

export default CARTS