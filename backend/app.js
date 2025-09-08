import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import seedAdmin from "./config/seedAdmin.js";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDb()

// seed admin
if(process.env.NODE_ENV === "production"){
    seedAdmin()
}
// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Routes
app.use("/users", userRouter)
app.use("/blogs", blogRouter)

// Global Error Middleware
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT} in ${process.env.NODE_ENV} mode.`)
})