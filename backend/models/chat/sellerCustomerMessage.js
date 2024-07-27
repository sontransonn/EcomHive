import mongoose from "mongoose"

const sellerCustomerSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    receverId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'unseen'
    }
},
    {
        timestamps: true
    }
)

const SELLER_CUSTOMER_MESSAGES = mongoose.model("seller_customer_messages", sellerCustomerSchema)

export default SELLER_CUSTOMER_MESSAGES