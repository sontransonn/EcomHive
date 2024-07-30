import formidable from "formidable";

import cloudinary from "../../configs/cloudinaryConfig.js";

import CATEGORIES from "../../models/categoriesModel.js";

export const add_category = async (req, res) => {
    try {
        const form = formidable({})

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: 'something error' })
            }

            let { name } = fields
            let { image } = files

            name = Array.isArray(name) ? name[0] : name;
            image = Array.isArray(image) ? image[0] : image;

            name = name.trim()
            const slug = name.split(' ').join('-')

            const result = await cloudinary.uploader.upload(image.filepath, { folder: 'categories' })

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

export const get_category = async (req, res) => {
    try {
        const { page, searchValue, parPage } = req.query

        let skipPage = ''
        if (parPage && page) {
            skipPage = parseInt(parPage) * (parseInt(page) - 1)
        }

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