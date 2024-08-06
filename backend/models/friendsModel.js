import mongoose from "mongoose"

const friendSchema = new mongoose.Schema({
    myId: {
        type: String,
        required: true
    },
    myFriends: {
        type: Array,
        default: []
    }
},
    {
        timestamps: true
    }
)

const FRIENDS = mongoose.model("friends", friendSchema)

export default FRIENDS