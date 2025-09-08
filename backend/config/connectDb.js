import mongoose, { mongo } from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("Database connected!")
    } catch (err) {
        console.log(err)
    }
}
