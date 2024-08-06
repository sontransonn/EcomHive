import http from "http"

import app from "./app.js";
import initSocket from "./socket.js";

import dbService from "./services/dbService.js"

const server = http.createServer(app)
initSocket(server);

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    dbService.connectDB()
    console.log(`Server is running on port ${PORT}`)
});