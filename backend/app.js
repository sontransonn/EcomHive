import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import "./configs/dotenvConfig.js"
import corsConfig from './configs/corsConfig.js';

import authRoutes from "./routes/authRoute.js"
import orderRoute from "./routes/orderRoute.js"
import chatRoute from "./routes/chatRoute.js"
import paymentRoute from "./routes/paymentRoute.js"

import ClientCategoryRoute from "./routes/client/categoryRoute.js"
import ClientProductRoute from "./routes/client/productRoute.js"
import ClientReviewRoute from "./routes/client/reviewRoute.js"
import ClientCartRoute from "./routes/client/cartRoute.js"
import ClientWishlistRoute from "./routes/client/wishlistRoute.js"

import DashboardCategoryRoute from "./routes/dashboard/categoryRoute.js"
import DashboardProductRoute from "./routes/dashboard/productRoute.js"
import DashboardSellerRoute from "./routes/dashboard/sellerRoute.js"

const app = express()

app.use(corsConfig)
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/chat", chatRoute)
app.use("/api/v1/payment", paymentRoute)

// -----clientRoute
app.use('/api/v1/client', ClientCategoryRoute)
app.use('/api/v1/client', ClientProductRoute)
app.use('/api/v1/client', ClientReviewRoute)
app.use('/api/v1/client', ClientCartRoute)
app.use('/api/v1/client', ClientWishlistRoute)

// -----dashboardRoute
app.use("/api/v1/dashboard", DashboardCategoryRoute)
app.use("/api/v1/dashboard", DashboardProductRoute)
app.use("/api/v1/dashboard", DashboardSellerRoute)

export default app