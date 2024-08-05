import WISHLISTS from "../../models/wishlistsModel.js";

class wishlistController {
    // Lấy ra các sản phẩm trong danh sách yêu thích
    static get_products_in_wishlist = async (req, res) => {
        try {
            const { userId } = req.params;

            const wishlists = await WISHLISTS.find({
                userId
            })

            return res.status(200).json({
                wishlistCount: wishlists.length,
                wishlists
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Thêm sản phẩm vào danh sách yêu thích
    static add_product_to_wishlist = async (req, res) => {
        try {
            const { slug } = req.body

            const product = await WISHLISTS.findOne({ slug })

            if (product) {
                return res.status(400).json({
                    error: 'Allready added'
                })
            }

            await WISHLISTS.create(req.body)

            return res.status(201).json({
                message: 'add to wishlist success'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Xóa sản phẩm trong danh sách yêu thích
    static delete_product_in_wishlist = async (req, res) => {
        try {
            const { wishlistId } = req.params

            const wishlist = await WISHLISTS.findByIdAndDelete(wishlistId)

            return res.status(200).json({
                message: 'Remove success',
                wishlistId
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }
}

export default wishlistController