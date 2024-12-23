import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Mongodb connection error: ${error.message}`);
        process.exit(1);// 1 is fail to connect, and 0 is success
    }
};