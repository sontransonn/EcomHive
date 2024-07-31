import PRODUCTS from "../../models/productsModel.js"
import CATEGORIES from "../../models/categoriesModel.js"

import { queryProducts } from "../../utils/queryUtil.js";

const formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
        let temp = []
        let j = i
        while (j < i + 3) {
            if (products[j]) {
                temp.push(products[j])
            }
            j++
        }
        productArray.push([...temp])
        i = j
    }
    return productArray
}

export const get_categorys = async (req, res) => {
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

export const get_products = async (req, res) => {
    try {
        const products = await PRODUCTS.find({}).limit(16).sort({
            createdAt: -1
        })

        const allProduct1 = await PRODUCTS.find({}).limit(9).sort({
            createdAt: -1
        })

        const latest_products = formateProduct(allProduct1);

        const allProduct2 = await PRODUCTS.find({}).limit(9).sort({
            rating: -1
        })

        const topRated_products = formateProduct(allProduct2);

        const allProduct3 = await PRODUCTS.find({}).limit(9).sort({
            discount: -1
        })

        const discount_products = formateProduct(allProduct3);

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

export const get_product = async (req, res) => {

}

export const price_range_product = async (req, res) => {
    try {
        const priceRange = {
            low: 0,
            high: 0
        }

        const products = await PRODUCTS.find({}).limit(9).sort({
            createdAt: -1
        })
        const latest_product = formateProduct(products);

        const getForPrice = await PRODUCTS.find({}).sort({
            'price': 1
        })
        if (getForPrice.length > 0) {
            priceRange.high = getForPrice[getForPrice.length - 1].price
            priceRange.low = getForPrice[0].price
        }

        res.status(200).json({
            latest_product,
            priceRange
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error })
    }
}

export const query_products = async (req, res) => {
    try {
        const parPage = 12
        req.query.parPage = parPage

        const products = await PRODUCTS.find({}).sort({
            createdAt: -1
        })

        const totalProduct = new queryProducts(products, req.query)
            .categoryQuery().searchQuery().priceQuery().ratingQuery().sortByPrice().countProducts();

        const result = new queryProducts(products, req.query)
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

export const submit_review = async (req, res) => {

}

export const get_reviews = async (req, res) => {

}