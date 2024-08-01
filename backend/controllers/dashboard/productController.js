import formidable from "formidable"

import cloudinary from "../../configs/cloudinaryConfig.js"

import PRODUCTS from "../../models/productsModel.js";

class productController {
    // Lấy ra các product theo query
    static get_products_by_query = async (req, res) => {
        try {
            const { id } = req;
            const { page, searchValue, parPage } = req.query

            // Tính số lượng bản ghi được bỏ qua khi phân trang
            const skipPage = parseInt(parPage) * (parseInt(page) - 1);

            // Xử lý query
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

    // Lấy product theo productId 
    static get_product_by_productId = async (req, res) => {
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

    // Thêm product
    static add_product = async (req, res) => {
        try {
            const { id } = req;
            const form = formidable({ multiples: true })

            form.parse(req, async (err, field, files) => {
                if (err) {
                    return res.status(400).json({ error: 'something error' })
                }

                // Lấy dữ liệu từ FormData
                let {
                    name,
                    category, description,
                    stock, price, discount, shopName, brand
                } = field;
                const { images } = files;

                // Xử lý nếu các dữ liệu nhận từ field là 1 mảng
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

                // Xử lý upload ảnh và gán các URL vào "allImageUrl"
                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.uploader.upload(images[i].filepath, { folder: 'products' })
                    allImageUrl = [...allImageUrl, result.url]
                }

                // Tạo product với các dữ liệu được xử lý
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

    // Update product theo productId
    static update_product_by_productId = async (req, res) => {
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

    // Update hình ảnh product theo productId
    static update_product_image_by_productId = async (req, res) => {
        try {
            const form = formidable({ multiples: true })

            form.parse(req, async (err, field, files) => {
                if (err) {
                    res.status(404).json({ error: err.message })
                }

                // Lấy dữ liệu từ FormData
                let { productId, oldImage } = field;
                let { newImage } = files

                // Xử lý nếu các dữ liệu nhận từ field là 1 mảng
                productId = Array.isArray(productId) ? productId[0] : productId;
                oldImage = Array.isArray(oldImage) ? oldImage[0] : oldImage;
                newImage = Array.isArray(newImage) ? newImage[0] : newImage;

                // Upload ảnh vào thư mục products trên cloudinary
                const result = await cloudinary.uploader.upload(newImage.filepath, { folder: 'products' })

                // Xử lý update ảnh trong Database nếu upload thành công
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
}

export default productController