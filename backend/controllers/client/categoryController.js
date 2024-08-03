import CATEGORIES from "../../models/categoriesModel.js"

class categoryController {
    //Lấy ra tất cả các category
    static get_all_category = async (req, res) => {
        try {
            const categories = await CATEGORIES.find({})

            return res.status(200).json({
                categories
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error })
        }
    }
}

export default categoryController