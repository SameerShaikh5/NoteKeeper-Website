import express from "express"
import { isLoggedIn } from "../middlewares/auth.js"
import { createBlog, deleteBlog, getAllCategories, getBlogById, getTopicsByCategory, paginatedBlogs, updateBlog } from "../controllers/blogController.js"
import { validateInput } from "../middlewares/validateInput.js"
import { createBlogSchema, deleteBlogSchema, getBlogSchema, getTopicsBlogSchema, updateBlogSchema } from "../validators/zodSchema.js"

const router = express.Router()

// pagination
router.get("/", isLoggedIn, paginatedBlogs)

// get a blog by id
router.get("/blog/:id", isLoggedIn, validateInput(getBlogSchema), getBlogById)

// create blog
router.post("/create", isLoggedIn,validateInput(createBlogSchema), createBlog)

// update blog
router.patch("/update/:id", isLoggedIn,validateInput(updateBlogSchema), updateBlog)

// delete blog
router.delete("/delete/:id", isLoggedIn,validateInput(deleteBlogSchema), deleteBlog)

// get all topics
router.get("/topics/:id", isLoggedIn, validateInput(getTopicsBlogSchema), getTopicsByCategory)

// get all catgories
router.get("/categories", isLoggedIn,validateInput(), getAllCategories)

const blogRouter = router

export default blogRouter