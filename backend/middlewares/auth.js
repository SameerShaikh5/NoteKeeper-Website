import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "./errorMiddleware.js";
import jwt from "jsonwebtoken"


export const isLoggedIn = TryCatch(
    async (req,res,next)=>{

        const {token} = req.cookies

        if(!token){
            return next(new ErrorHandler("You need to login first!", 401))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded._id)
        if(!user){
            return next(new ErrorHandler("User doesn't exist!", 404))
        }

        req.user = user
        return next()
    }
)

export const isAdmin = TryCatch(
    async(req,res,next)=>{
        if(req.user.role === "Admin"){
            return next()
        }
        return next(new ErrorHandler("Unauthorized! Admins Only.", 401))
    }
)