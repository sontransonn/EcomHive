import mongoose from "mongoose";

class dbService {
    static connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGO_DB_URI);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.log("Error connecting to MongoDB", error.message);
        }
    };
}
export default dbService
