import formidable from "formidable";

import cloudinary from "../../configs/cloudinaryConfig.js";

import CATEGORIES from "../../models/categoriesModel.js";

class categoryController {
    // Lấy ra các category theo query
    static get_categories_by_query = async (req, res) => {
        try {
            const { page, searchValue, parPage } = req.query

            // Tính số lượng bản ghi được bỏ qua khi phân trang
            let skipPage = ''
            if (parPage && page) {
                skipPage = parseInt(parPage) * (parseInt(page) - 1)
            }

            // Xử lý query
            if (searchValue && page && parPage) {
                const categories = await CATEGORIES.find({
                    $text: { $search: searchValue }
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalCategory = await CATEGORIES.find({
                    $text: { $search: searchValue }
                }).countDocuments()

                return res.status(200).json({
                    totalCategory,
                    categories
                })
            } else if (searchValue === '' && page && parPage) {
                const categories = await CATEGORIES.find({}).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalCategory = await CATEGORIES.find({}).countDocuments()

                return res.status(200).json({
                    totalCategory,
                    categories
                })
            } else {
                const categories = await CATEGORIES.find({}).sort({ createdAt: -1 })

                const totalCategory = await CATEGORIES.find({}).countDocuments()

                return res.status(200).json({
                    totalCategory,
                    categories
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Thêm category
    static add_category = async (req, res) => {
        try {
            const form = formidable({})

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(400).json({ error: 'something error' })
                }

                // Lấy dữ liệu từ FormData
                let { name } = fields
                let { image } = files

                // Xử lý nếu name hay image là 1 mảng
                name = Array.isArray(name) ? name[0] : name;
                image = Array.isArray(image) ? image[0] : image;

                name = name.trim()
                const slug = name.split(' ').join('-')

                // Upload ảnh vào thư mục categories trên cloudinary
                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'categories' })

                // Tạo category nếu upload thành công
                if (result) {
                    const category = await CATEGORIES.create({
                        name,
                        slug,
                        image: result.url
                    })

                    res.status(201).json({
                        category,
                        message: 'category add success'
                    })
                } else {
                    res.status(400).json({ error: 'Image upload failed' })
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }
}

export default categoryController