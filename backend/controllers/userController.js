import { TryCatch } from "../middlewares/errorMiddleware.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = TryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists!", 400));
  }

  // Create user
  const user = await User.create({ name, email, password });

  // Generate JWT
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Send token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    sameSite: "none",   // not None
    secure: true
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
});

// Login User
export const loginUser = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User doesn't exist!", 400));
  }

  // Verify password
  const isMatch = await user.verifyPassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect password!", 400));
  }

  // Generate JWT
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Send token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    sameSite: "none",   // not None
    secure: true
  });

  return res.status(200).json({
    success: true,
    message: "User logged in successfully!",
  });
});


// logout user
export const logoutUser = TryCatch(async (req, res, next) => {
    // Clear the token cookie
    res.clearCookie("token", {
        httpOnly: true,      // safest option
        secure: process.env.NODE_ENV === "production", // only send over HTTPS in production
        sameSite: "lax"      // helps prevent CSRF attacks
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully!"
    });
});


export const verifyLoggedIn = TryCatch(async (req, res, next) => {
    if (req.cookies.token) {
        return res.status(200).json({
            success: true,
            message: "Logged in",
            loggedIn: true
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Not logged in",
            loggedIn: false
        });
    }
});
