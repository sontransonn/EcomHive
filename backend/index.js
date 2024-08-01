import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import "./configs/dotenvConfig.js"
import corsConfig from './configs/corsConfig.js';

import authRoutes from "./routes/authRoute.js"

import clientRoute from "./routes/client/clientRoute.js"
import dashboardRoute from "./routes/dashboard/dashboardRoute.js"

import { connectDB } from "./services/dbService.js";

const app = express()

const PORT = process.env.PORT || 5000

app.use(corsConfig)
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api", authRoutes)

app.use('/api/home', clientRoute)
app.use("/api", dashboardRoute)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});