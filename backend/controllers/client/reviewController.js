import mongoose from "mongoose";
import moment from "moment"

import REVIEWS from "../../models/reviewsModel.js";
import PRODUCTS from "../../models/productsModel.js"

class reviewController {
    static submit_review = async (req, res) => {
        try {
            const { name, rating, review, productId } = req.body

            await REVIEWS.create({
                productId,
                name,
                rating,
                review,
                date: moment(Date.now()).format('LL')
            })

            let rat = 0;
            const reviews = await REVIEWS.find({
                productId
            });

            for (let i = 0; i < reviews.length; i++) {
                rat = rat + reviews[i].rating
            }

            let productRating = 0;
            if (reviews.length !== 0) {
                productRating = (rat / reviews.length).toFixed(1)
            }

            await PRODUCTS.findByIdAndUpdate(productId, {
                rating: productRating
            })

            return res.status(201).json({
                message: "Review Success"
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static get_reviews = async (req, res) => {
        try {
            const { productId } = req.params
            let { pageNo } = req.query

            pageNo = parseInt(pageNo)

            const limit = 5
            const skipPage = limit * (pageNo - 1)

            let getRating = await REVIEWS.aggregate([{
                $match: {
                    productId: { $eq: new mongoose.Types.ObjectId(productId) },
                    rating: { $not: { $size: 0 } }
                }
            },
            { $unwind: "$rating" },
            {
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 }
                }
            }
            ])

            let rating_review = [{
                rating: 5,
                sum: 0
            },
            {
                rating: 4,
                sum: 0
            },
            {
                rating: 3,
                sum: 0
            },
            {
                rating: 2,
                sum: 0
            },
            {
                rating: 1,
                sum: 0
            }]

            for (let i = 0; i < rating_review.length; i++) {
                for (let j = 0; j < getRating.length; j++) {
                    if (rating_review[i].rating === getRating[j]._id) {
                        rating_review[i].sum = getRating[j].count
                        break
                    }
                }
            }

            const getAll = await REVIEWS.find({
                productId
            })

            const reviews = await REVIEWS.find({ productId })
                .skip(skipPage).limit(limit).sort({ createdAt: -1 })

            return res.status(200).json({
                reviews,
                totalReview: getAll.length,
                rating_review
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }
}
export default reviewController