import express from "express"
import { loginUser, logoutUser, registerUser, verifyLoggedIn } from "../controllers/userController.js"
import { isLoggedIn } from "../middlewares/auth.js"

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/logout", isLoggedIn, logoutUser)

router.get("/verifyLogin", verifyLoggedIn)

const userRouter = router

export default userRouter