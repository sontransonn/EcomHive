import SELLERS from "../models/sellersModel.js"
import CUSTOMER from "../models/customersModel.js"
import FRIENDS from "../models/friendsModel.js";
import SC_MESSAGES from "../models/messages/scMessagesModel.js";
import AS_MESSAGES from "../models/messages/asMessagesModel.js";

class chatController {
    static add_customer_friend = async (req, res) => {
        try {
            const { sellerId, userId } = req.body;

            if (sellerId !== '') {
                const seller = await SELLERS.findById(sellerId)
                const user = await CUSTOMER.findById(userId)

                const checkSeller = await FRIENDS.findOne({
                    $and: [{ myId: { $eq: userId } },
                    {
                        myFriends: {
                            $elemMatch: { fdId: sellerId }
                        }
                    }]
                })

                if (!checkSeller) {
                    await FRIENDS.updateOne({ myId: userId }, {
                        $push: {
                            myFriends: {
                                fdId: sellerId,
                                name: seller.shopInfo?.shopName,
                                image: seller.image
                            }
                        }
                    })
                }

                const checkCustomer = await FRIENDS.findOne({
                    $and: [{ myId: { $eq: sellerId } }, {
                        myFriends: {
                            $elemMatch: {
                                fdId: userId
                            }
                        }
                    }]
                })

                if (!checkCustomer) {
                    await FRIENDS.updateOne({ myId: sellerId }, {
                        $push: {
                            myFriends: {
                                fdId: userId,
                                name: user.name,
                                image: ""
                            }
                        }
                    })
                }

                const messages = await SC_MESSAGES.find({
                    $or: [
                        {
                            $and: [{
                                receverId: { $eq: sellerId }
                            }, {
                                senderId: {
                                    $eq: userId
                                }
                            }]
                        },
                        {
                            $and: [{
                                receverId: { $eq: userId }
                            }, {
                                senderId: {
                                    $eq: sellerId
                                }
                            }]
                        }
                    ]
                })

                const MyFriends = await FRIENDS.findOne({
                    myId: userId
                })

                const currentFd = MyFriends.myFriends.find(s => s.fdId === sellerId)

                return res.status(200).json({
                    myFriends: MyFriends.myFriends,
                    currentFd,
                    messages
                })
            } else {
                const MyFriends = await FRIENDS.findOne({
                    myId: userId
                })

                return res.status(200).json({
                    myFriends: MyFriends.myFriends,
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static customer_message_add = async (req, res) => {

    }
}

export default chatController