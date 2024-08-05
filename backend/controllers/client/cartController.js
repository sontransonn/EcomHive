import { mongo } from "mongoose"

import CARTS from "../../models/cartsModel.js"

class cartController {
    // Lấy ra các sản phẩm trong giỏ hàng
    static get_products_in_cart = async (req, res) => {
        try {
            const co = 5; // Hệ số giảm giá thêm
            const { userId } = req.params

            // Truy vấn giỏ hàng của người dùng và nối với thông tin sản phẩm từ collection 'products'
            const card_products = await CARTS.aggregate([{
                $match: { userId: { $eq: new mongo.ObjectId(userId) } }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: "_id",
                    as: 'products'
                }
            }])

            let buy_product_item = 0 // Tổng số lượng sản phẩm người dùng có thể mua
            let calculatePrice = 0; // Tổng giá trị sản phẩm trong giỏ hàng
            let card_product_count = 0; // Tổng số lượng sản phẩm trong giỏ hàng

            // Lọc sản phẩm hết hàng
            const outOfStockProduct = card_products.filter(p => p.products[0].stock < p.quantity)
            for (let i = 0; i < outOfStockProduct.length; i++) {
                card_product_count = card_product_count + outOfStockProduct[i].quantity
            }

            // Lọc sản phẩm còn hàng
            const stockProduct = card_products.filter(p => p.products[0].stock >= p.quantity)
            for (let i = 0; i < stockProduct.length; i++) {
                const { quantity } = stockProduct[i]
                card_product_count = card_product_count + quantity
                buy_product_item = buy_product_item + quantity
                const {
                    price,
                    discount
                } = stockProduct[i].products[0]
                if (discount !== 0) {
                    calculatePrice = calculatePrice + quantity * (price - Math.floor((price * discount) / 100))
                } else {
                    calculatePrice = calculatePrice + quantity * price
                }
            }

            // Nhóm sản phẩm theo người bán và tính toán giá
            let p = []
            let unique = [...new Set(stockProduct.map(p => p.products[0].sellerId.toString()))]
            for (let i = 0; i < unique.length; i++) {
                let price = 0;
                for (let j = 0; j < stockProduct.length; j++) {
                    const tempProduct = stockProduct[j].products[0]
                    if (unique[i] === tempProduct.sellerId.toString()) {
                        let pri = 0;
                        if (tempProduct.discount !== 0) {
                            pri = tempProduct.price - Math.floor((tempProduct.price * tempProduct.discount) / 100)
                        } else {
                            pri = tempProduct.price
                        }
                        pri = pri - Math.floor((pri * co) / 100)
                        price = price + pri * stockProduct[j].quantity
                        p[i] = {
                            sellerId: unique[i],
                            shopName: tempProduct.shopName,
                            price,
                            products: p[i] ? [
                                ...p[i].products,
                                {
                                    _id: stockProduct[j]._id,
                                    quantity: stockProduct[j].quantity,
                                    productInfo: tempProduct
                                }
                            ] : [{
                                _id: stockProduct[j]._id,
                                quantity: stockProduct[j].quantity,
                                productInfo: tempProduct

                            }]
                        }
                    }

                }
            }

            return res.status(200).json({
                card_products: p, // Danh sách sản phẩm trong giỏ hàng, nhóm theo người bán
                price: calculatePrice, // Tổng giá trị sản phẩm trong giỏ hàng
                card_product_count,  // Tổng số lượng sản phẩm trong giỏ hàng
                shipping_fee: 85 * p.length, // Phí vận chuyển
                outOfStockProduct, // Danh sách sản phẩm hết hàng
                buy_product_item  // Tổng số lượng sản phẩm người dùng có thể mua
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Thêm sản phẩm vào giỏ hàng
    static add_product_to_cart = async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body

            const product = await CARTS.findOne({
                $and: [{
                    productId: {
                        $eq: productId
                    }
                },
                {
                    userId: {
                        $eq: userId
                    }
                }
                ]
            })

            if (product) {
                return res.status(400).json({ error: 'Product already added to card' })
            }

            const newProduct = await CARTS.create({
                userId,
                productId,
                quantity
            })

            return res.status(200).json({
                message: 'Add to card success',
                newProduct
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Tăng số lượng sản phẩm
    static quantity_inc = async (req, res) => {
        try {
            const { card_id } = req.params

            const product = await CARTS.findById(card_id)
            const {
                quantity
            } = product

            await CARTS.findByIdAndUpdate(card_id, {
                quantity: quantity + 1
            })
            res.status(200).json({
                message: 'success'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Giảm số lượng sản phẩm
    static quantity_dec = async (req, res) => {
        const { card_id } = req.params
        try {
            const product = await CARTS.findById(card_id)
            const {
                quantity
            } = product
            await CARTS.findByIdAndUpdate(card_id, {
                quantity: quantity - 1
            })
            res.status(200).json({
                message: 'success'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Xóa sản phẩm trong giỏ hàng
    static delete_product_in_cart = async (req, res) => {
        try {
            const { card_id } = req.params

            await CARTS.findByIdAndDelete(card_id)

            res.status(200).json({
                message: 'success'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }
}

export default cartController