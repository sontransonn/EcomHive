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

    // Gửi tin nhắn từ customer đến seller
    static send_message_from_customer_to_seller = async (req, res) => {
        try {
            const { userId, text, sellerId, name } = req.body

            // Tạo tin nhắn mới trong SC_MESSAGES
            const message = await SC_MESSAGES.create({
                senderId: userId,
                senderName: name,
                receverId: sellerId,
                message: text
            })

            // Lấy ra danh sách bạn bè của customer
            const data = await FRIENDS.findOne({ myId: userId })
            let myFriends = data.myFriends

            // Tìm vị trí của seller trong danh sách
            let index = myFriends.findIndex(f => f.fdId === sellerId)

            // Đẩy seller lên đầu danh sách và cập nhật lại FRIENDS
            while (index > 0) {
                let temp = myFriends[index]
                myFriends[index] = myFriends[index - 1]
                myFriends[index - 1] = temp
                index--
            }
            await FRIENDS.updateOne({ myId: sellerId }, {
                myFriends
            })

            // Lấy ra danh sách bạn bè của seller
            const data1 = await FRIENDS.findOne({ myId: sellerId })
            let myFriends1 = data1.myFriends

            // Tìm vị trí của customer trong danh sách
            let index1 = myFriends1.findIndex(f => f.fdId === userId)

            // Đẩy customer lên đầu danh sách và cập nhật lại FRIENDS
            while (index1 > 0) {
                let temp1 = myFriends1[index1]
                myFriends1[index1] = myFriends[index1 - 1]
                myFriends1[index1 - 1] = temp1
                index1--
            }
            await FRIENDS.updateOne({ myId: sellerId }, {
                myFriends1
            })

            return res.status(201).json({
                message
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static get_customers = async (req, res) => {
        try {
            const { sellerId } = req.params

            const data = await FRIENDS.findOne({ myId: sellerId })

            return res.status(200).json({
                customers: data.myFriends
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static get_customer_seller_message = async (req, res) => {
        try {
            const { customerId } = req.params
            const { id } = req

            const messages = await SC_MESSAGES.find({
                $or: [
                    {
                        $and: [{
                            receverId: { $eq: customerId }
                        }, {
                            senderId: {
                                $eq: id
                            }
                        }]
                    },
                    {
                        $and: [{
                            receverId: { $eq: id }
                        }, {
                            senderId: {
                                $eq: customerId
                            }
                        }]
                    }
                ]
            })

            const currentCustomer = await CUSTOMER.findById(customerId)

            return res.status(200).json({
                messages,
                currentCustomer
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static seller_message_add = async (req, res) => {

    }
}

export default chatController