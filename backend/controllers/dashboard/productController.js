import formidable from "formidable"

import cloudinary from "../../configs/cloudinaryConfig.js"

import PRODUCTS from "../../models/productsModel.js";

export const add_product = async (req, res) => {
    try {
        const { id } = req;
        const form = formidable({ multiples: true })

        form.parse(req, async (err, field, files) => {
            let {
                name,
                category,
                description,
                stock, price,
                discount, shopName, brand
            } = field;

            const { images } = files;

            name = Array.isArray(name) ? name[0] : name;
            category = Array.isArray(category) ? category[0] : category;
            description = Array.isArray(description) ? description[0] : description;
            stock = Array.isArray(stock) ? stock[0] : stock;
            price = Array.isArray(price) ? price[0] : price;
            discount = Array.isArray(discount) ? discount[0] : discount;
            shopName = Array.isArray(shopName) ? shopName[0] : shopName;
            brand = Array.isArray(brand) ? brand[0] : brand;

            name = name.trim()
            const slug = name.split(' ').join('-')

            let allImageUrl = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.uploader.upload(images[i].filepath, { folder: 'products' })
                allImageUrl = [...allImageUrl, result.url]
            }

            await PRODUCTS.create({
                sellerId: id,
                name,
                slug,
                shopName,
                category: category.trim(),
                description: description.trim(),
                stock: parseInt(stock),
                price: parseInt(price),
                discount: parseInt(discount),
                images: allImageUrl,
                brand: brand.trim()
            })

            return res.status(201).json({
                message: "product add success"
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const products_get = async (req, res) => {
    try {
        const { page, searchValue, parPage } = req.query
        const { id } = req;

        const skipPage = parseInt(parPage) * (parseInt(page) - 1);

        if (searchValue) {
            const products = await PRODUCTS.find({
                $text: { $search: searchValue },
                sellerId: id
            }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

            const totalProduct = await PRODUCTS.find({
                $text: { $search: searchValue },
                sellerId: id
            }).countDocuments()

            return res.status(200).json({
                totalProduct,
                products
            })
        } else {
            const products = await PRODUCTS.find({
                sellerId: id
            }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

            const totalProduct = await PRODUCTS.find({
                sellerId: id
            }).countDocuments()

            return res.status(200).json({
                totalProduct,
                products
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const product_get = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await PRODUCTS.findById(productId)

        res.status(200).json({
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const product_update = async (req, res) => {
    try {
        let {
            name,
            description, discount,
            price, brand, productId, stock
        } = req.body;

        name = name.trim()
        const slug = name.split(' ').join('-')

        await PRODUCTS.findByIdAndUpdate(productId, {
            name,
            description, discount,
            price, brand, productId, stock, slug
        })

        const product = await PRODUCTS.findById(productId)

        return res.status(200).json({
            product,
            message: 'product update success'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const product_image_update = async (req, res) => {
    try {
        const form = formidable({ multiples: true })

        form.parse(req, async (err, field, files) => {
            let { productId, oldImage } = field;
            let { newImage } = files

            productId = Array.isArray(productId) ? productId[0] : productId;
            oldImage = Array.isArray(oldImage) ? oldImage[0] : oldImage;
            newImage = Array.isArray(newImage) ? newImage[0] : newImage;

            if (err) {
                res.status(404).json({ error: err.message })
            }

            const result = await cloudinary.uploader.upload(newImage.filepath, { folder: 'products' })

            if (result) {
                let { images } = await PRODUCTS.findById(productId)
                const index = images.findIndex(img => img === oldImage)
                images[index] = result.url;

                await PRODUCTS.findByIdAndUpdate(productId, {
                    images
                })

                const product = await PRODUCTS.findById(productId)

                return res.status(200).json({
                    product,
                    message: 'product image update success'
                })
            } else {
                res.status(400).json({ error: 'image upload failed' })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}