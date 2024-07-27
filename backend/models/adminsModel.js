import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'admin'
    }
},
    {
        timestamps: true
    }
)

const ADMINS = mongoose.model("admins", adminSchema)

export default ADMINS