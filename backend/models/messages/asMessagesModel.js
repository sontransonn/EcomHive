import mongoose from "mongoose"

const asMessageSchema = new mongoose.Schema({
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

const AS_MESSAGES = mongoose.model("as_messages", asMessageSchema)

export default AS_MESSAGES