import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import "./configs/dotenvConfig.js"
import corsConfig from './configs/corsConfig.js';

import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/dashboard/categoryRoutes.js"
import productRoutes from "./routes/dashboard/productRoutes.js"
import sellerRoutes from "./routes/dashboard/sellerRoutes.js"

import { connectDB } from "./services/dbService.js";

const app = express()

const PORT = process.env.PORT || 5000

app.use(corsConfig)
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api", authRoutes)

app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", sellerRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});