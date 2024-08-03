import mongoose from "mongoose"

const customerOrder = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    shippingInfo: {
        type: Object,
        required: true
    },
    delivery_status: {
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

const CUSTOMERORDERS = mongoose.model('customerOrders', customerOrder)

export default CUSTOMERORDERS