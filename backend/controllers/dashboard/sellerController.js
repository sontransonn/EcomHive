import SELLERS from "../../models/sellersModel.js"

class sellerController {
    // Lấy ra các seller ở trạng thái pending theo query
    static get_pending_sellers_by_query = async (req, res) => {
        try {
            const { page, searchValue, parPage } = req.query

            // Tính số lượng bản ghi được bỏ qua khi phân trang
            const skipPage = parseInt(parPage) * (parseInt(page) - 1)

            // Xử lý query
            if (searchValue) {

            } else {
                const sellers = await SELLERS.find({ status: 'pending' })
                    .skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalSeller = await SELLERS.find({ status: 'pending' }).countDocuments()

                return res.status(200).json({
                    totalSeller,
                    sellers
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Lấy ra các seller ở trạng thái active theo query
    static get_active_sellers_by_query = async (req, res) => {

    }

    // Lấy ra các seller ở trạng thái deactive theo query
    static get_deactive_sellers_by_query = async (req, res) => {

    }

    // Lấy seller theo sellerId
    static get_seller_by_sellerId = async (req, res) => {
        try {
            const { sellerId } = req.params

            const seller = await SELLERS.findById(sellerId)

            res.status(200).json({
                seller
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Update trạng thái seller theo sellerId
    static update_status_seller_by_sellerId = async (req, res) => {
        try {
            const { sellerId, status } = req.body

            await SELLERS.findByIdAndUpdate(sellerId, {
                status
            })

            const seller = await SELLERS.findById(sellerId)

            return res.status(200).json({
                seller,
                message: 'seller status update success'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }
}

export default sellerController


