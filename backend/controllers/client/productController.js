import PRODUCTS from "../../models/productsModel.js"

import formatUtil from "../../utils/formatUtil.js";
import queryUtil from "../../utils/queryUtil.js";

class productController {
    // Lấy ra các loại sản phẩm 
    static get_products = async (req, res) => {
        try {
            // Lấy 16 sản phẩm mới nhất
            const products = await PRODUCTS.find({}).limit(16).sort({ createdAt: -1 })

            // Lấy 9 sản phẩm mới nhất và định dạng lại
            const latest_products = formatUtil.formateProduct(await PRODUCTS.find({}).limit(9).sort({ createdAt: -1 }));

            // Lấy 9 sản phẩm có đánh giá cao nhất và định dạng lại
            const topRated_products = formatUtil.formateProduct(await PRODUCTS.find({}).limit(9).sort({ rating: -1 }));

            // Lấy 9 sản phẩm có giảm giá cao nhất và định dạng lại
            const discount_products = formatUtil.formateProduct(await PRODUCTS.find({}).limit(9).sort({ discount: -1 }));

            return res.status(200).json({
                products,
                latest_products,
                topRated_products,
                discount_products
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error })
        }
    }

    // Lấy ra sản phẩm theo slug
    static get_product_by_slug = async (req, res) => {

    }

    // Lấy ra các sản phẩm mới nhất và phạm vi giá của các sản phẩm 
    static price_range_products = async (req, res) => {
        try {
            // Khởi tạo phạm vi giá ban đầu
            const priceRange = {
                low: 0,
                high: 0
            }

            // Lấy 9 sản phẩm mới nhất
            const latest_products = formatUtil.formateProduct(await PRODUCTS.find({}).limit(9).sort({ createdAt: -1 }));

            // Lấy tất cả sản phẩm và sắp xếp theo giá từ thấp đến cao
            const products = await PRODUCTS.find({}).sort({ 'price': 1 })

            // Nếu có sản phẩm, cập nhật phạm vi giá
            if (products.length > 0) {
                priceRange.high = products[products.length - 1].price
                priceRange.low = products[0].price
            }

            res.status(200).json({
                latest_products,
                priceRange
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error })
        }
    }

    // Lấy ra các sản phẩm dựa trên query
    static get_products_by_query = async (req, res) => {
        try {
            const parPage = 12
            req.query.parPage = parPage

            const products = await PRODUCTS.find({}).sort({
                createdAt: -1
            })

            const totalProduct = new queryUtil(products, req.query)
                .categoryQuery().searchQuery().priceQuery().ratingQuery().sortByPrice().countProducts();

            const result = new queryUtil(products, req.query)
                .categoryQuery().searchQuery().ratingQuery().priceQuery().sortByPrice().skip().limit().getProducts();

            return res.status(200).json({
                products: result,
                totalProduct,
                parPage
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error })
        }
    }
}

export default productController