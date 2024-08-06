import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const REVIEWS = mongoose.model("reviews", reviewSchema)

export default REVIEWS