import SELLERS from "../../models/sellersModel.js"

export const get_seller_request = async (req, res) => {
    try {
        const {
            page,
            searchValue, parPage
        } = req.query
        const skipPage = parseInt(parPage) * (parseInt(page) - 1)

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

export const get_active_sellers = async (req, res) => {

}

export const get_deactive_sellers = async (req, res) => {

}

export const get_seller = async (req, res) => {
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

export const seller_status_update = async (req, res) => {
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