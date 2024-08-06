import mongoose from "mongoose"

const scMessageSchema = new mongoose.Schema({
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

const SC_MESSAGES = mongoose.model("sc_messages", scMessageSchema)

export default SC_MESSAGES