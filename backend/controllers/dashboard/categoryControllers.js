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

            if (Array.isArray(name)) {
                name = name[0];
            }
            if (Array.isArray(image)) {
                image = image[0];
            }

            name = name.trim()
            const slug = name.split(' ').join('-')

            try {
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
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: error })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const get_category = async (req, res) => {

}