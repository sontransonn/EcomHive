import mongoose from "mongoose"
import moment from "moment"

import AUTHORORDERS from "../models/authOrders.js"
import CUSTOMERORDERS from "../models/customerOrders.js"
import CARTS from "../models/cartsModel.js"

class orderController {
    // Lấy ra các đơn hàng theo query ở phía admin
    static get_admin_orders = async (req, res) => {
        try {
            let { page, parPage, searchValue } = req.query
            page = parseInt(page)
            parPage = parseInt(parPage)

            const skipPage = parPage * (page - 1)

            if (searchValue) {

            } else {
                const orders = await CUSTOMERORDERS.aggregate([
                    {
                        $lookup: {
                            from: 'authorrders',
                            localField: "_id",
                            foreignField: 'orderId',
                            as: 'suborder'
                        }
                    }
                ]).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalOrder = await CUSTOMERORDERS.aggregate([
                    {
                        $lookup: {
                            from: 'authororders',
                            localField: "_id",
                            foreignField: 'orderId',
                            as: 'suborder'
                        }
                    }
                ])

                return res.status(200).json({
                    orders,
                    totalOrder: totalOrder.length
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Lấy ra chi tiết đơn hàng theo orderId ở phía admin
    static get_admin_order = async (req, res) => {
        try {
            const { orderId } = req.params

            const order = await CUSTOMERORDERS.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(orderId) }
                }, {
                    $lookup: {
                        from: 'authororders',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'suborder'
                    }
                }
            ])

            return res.status(200).json({
                order: order[0]
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Cập nhật status của order ở phía admin
    static admin_order_status_update = async (req, res) => {
        try {
            const { orderId } = req.params
            const { status } = req.body

            await CUSTOMERORDERS.findByIdAndUpdate(orderId, {
                delivery_status: status
            })

            return res.status(200).json({
                message: 'order status change success'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Lấy ra các đơn hàng theo query ở phía seller
    static get_seller_orders = async (req, res) => {
        try {
            const { sellerId } = req.params

            let { page, parPage, searchValue } = req.query
            page = parseInt(page)
            parPage = parseInt(parPage)

            const skipPage = parPage * (page - 1)

            if (searchValue) {

            } else {
                const orders = await AUTHORORDERS.find({
                    sellerId,
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalOrder = await AUTHORORDERS.find({
                    sellerId,
                }).countDocuments()

                return res.status(200).json({
                    orders,
                    totalOrder
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Lấy ra chi tiết đơn hàng theo orderId ở phía seller
    static get_seller_order = async (req, res) => {
        try {
            const { orderId } = req.params

            const order = await AUTHORORDERS.findById(orderId)

            return res.status(200).json({
                order
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static paymentCheck = async (id) => {
        try {
            const order = await CUSTOMERORDERS.findById(id)
            if (order.payment_status === 'unpaid') {
                await CUSTOMERORDERS.findByIdAndUpdate(id, {
                    delivery_status: 'cancelled'
                })
                await AUTHORORDERS.updateMany({
                    orderId: id
                }, {
                    delivery_status: "cancelled"
                })
            }
            return true
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static order_confirm = async (req, res) => {

    }

    static get_customer_databorad_data = async (req, res) => {
        try {
            const { userId } = req.params

            const recentOrders = await CUSTOMERORDERS.find({
                customerId: userId
            }).limit(5)

            const pendingOrder = await CUSTOMERORDERS.find({
                customerId: userId,
                delivery_status: 'pending'
            }).countDocuments()

            const totalOrder = await CUSTOMERORDERS.find({
                customerId: userId
            }).countDocuments()

            const cancelledOrder = await CUSTOMERORDERS.find({
                customerId: userId,
                delivery_status: 'cancelled'
            }).countDocuments()

            res.status(200).json({
                recentOrders,
                pendingOrder,
                cancelledOrder,
                totalOrder
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static get_orders = async (req, res) => {
        try {
            const { customerId, status } = req.params

            let orders = []
            if (status !== 'all') {
                orders = await CUSTOMERORDERS.find({
                    customerId: customerId,
                    delivery_status: status
                })
            } else {
                orders = await CUSTOMERORDERS.find({
                    customerId: customerId
                })
            }
            res.status(200).json({
                orders
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static get_order = async (req, res) => {
        try {
            const { orderId } = req.params

            const order = await CUSTOMERORDERS.findById(orderId)

            res.status(200).json({
                order
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static place_order = async (req, res) => {
        try {
            const {
                price, products,
                shipping_fee, shippingInfo, userId
            } = req.body

            let authorOrderData = []
            let cardId = []
            const tempDate = moment(Date.now()).format('LLL')

            let customerOrderProduct = []

            for (let i = 0; i < products.length; i++) {
                const pro = products[i].products
                for (let j = 0; j < pro.length; j++) {
                    let tempCusPro = pro[j].productInfo
                    tempCusPro.quantity = pro[j].quantity
                    customerOrderProduct.push(tempCusPro)
                    if (pro[j]._id) {
                        cardId.push(pro[j]._id)
                    }
                }
            }

            const order = await CUSTOMERORDERS.create({
                customerId: userId,
                shippingInfo,
                products: customerOrderProduct,
                price: price + shipping_fee,
                delivery_status: 'pending',
                payment_status: 'unpaid',
                date: tempDate
            })
            for (let i = 0; i < products.length; i++) {
                const pro = products[i].products
                const pri = products[i].price
                const sellerId = products[i].sellerId
                let storePro = []
                for (let j = 0; j < pro.length; j++) {
                    let tempPro = pro[j].productInfo
                    tempPro.quantity = pro[j].quantity
                    storePro.push(tempPro)
                }

                authorOrderData.push({
                    orderId: order.id,
                    sellerId,
                    products: storePro,
                    price: pri,
                    payment_status: 'unpaid',
                    shippingInfo: 'Dhaka myshop Warehouse',
                    delivery_status: 'pending',
                    date: tempDate
                })
            }
            await AUTHORORDERS.insertMany(authorOrderData)
            for (let k = 0; k < cardId.length; k++) {
                await CARTS.findByIdAndDelete(cardId[k])
            }
            setTimeout(() => {
                this.paymentCheck(order.id)
            }, 15000)

            res.status(201).json({
                message: "order placeed success",
                orderId: order.id
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static create_payment = async (req, res) => {

    }
}

export default orderController