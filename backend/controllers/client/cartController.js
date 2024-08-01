import CARDS from "../../models/cardsModel.js"

class cartController {

    static get_card_products = async (req, res) => {
        try {
            const co = 5;
            const { userId } = req.params

            const card_products = await CARDS.aggregate([{
                $match: {
                    userId: {
                        $eq: new ObjectId(userId)
                    }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: "_id",
                    as: 'products'
                }
            }])

            let buy_product_item = 0
            let calculatePrice = 0;
            let card_product_count = 0;
            const outOfStockProduct = card_products.filter(p => p.products[0].stock < p.quantity)
            for (let i = 0; i < outOfStockProduct.length; i++) {
                card_product_count = card_product_count + outOfStockProduct[i].quantity
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static get_wishlist = async (req, res) => {

    }

    static add_to_cart = async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body

            const product = await CARDS.findOne({
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

            const newProduct = await CARDS.create({
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

    static add_wishlist = async (req, res) => {

    }

    static quantity_inc = async (req, res) => {

    }

    static quantity_dec = async (req, res) => {

    }

    static delete_card_product = async (req, res) => {

    }

    static delete_wishlist = async (req, res) => {

    }

}

export default cartController