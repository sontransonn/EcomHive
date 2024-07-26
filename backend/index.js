import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import "./configs/dotenvConfig.js"
import corsConfig from './configs/corsConfig.js';

import authRoute from "./routes/authRoute.js"

import { connectDB } from "./services/dbService.js";

const app = express()

const PORT = process.env.PORT || 5000

app.use(corsConfig)
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api", authRoute)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});