import cors from "cors"

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    optionsSuccessStatus: 204,
    credentials: true
}

export default cors(corsOptions)