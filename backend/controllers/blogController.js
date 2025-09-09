import { TryCatch } from "../middlewares/errorMiddleware.js";
import Blog from "../models/blogModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// pagination
export const paginatedBlogs = TryCatch(
    async(req,res,next)=>{

        let category = req.query.category
        let page = parseInt(req.query.page) || 1;
        if (page < 1) page = 1;
        if(!category){
          return next(new ErrorHandler("Category is required!", 400))
        }
        const limit = 10
        const start = (page-1) * limit
        
        const blogs = await Blog.find({authorId:req.user._id, category:category}).skip(start).limit(limit).sort({createdAt:-1}).lean()

        const totalBlogs = await Blog.countDocuments({ authorId: req.user._id, category });

        const numPages = Math.ceil(totalBlogs / limit)
        
        return res.status(200).json({
            success:true,
            message:"Blogs fetched successfully!",
            data:blogs,
            pages:numPages
        })
    }
)


// get a blog
export const getBlogById = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findOne({ _id: id, authorId: req.user._id }).lean();

  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Blog fetched successfully!",
    data: blog,
  });
});


// Create Blog
export const createBlog = TryCatch(async (req, res, next) => {
  const { topic, content, category, tags } = req.body;


  const blog = await Blog.create({
    topic,
    content,
    category,
    tags: tags || [],
    authorId: req.user._id,
  });

  return res.status(201).json({
    success: true,
    message: "Blog created successfully!",
    data: blog,
  });
});

// update blog
export const updateBlog = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { topic, content, category, tags } = req.body;

  let blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  // Ensure only owner can update
  if (blog.authorId.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
    return next(new ErrorHandler("You are not authorized to update this blog", 403));
  }

  // Update fields if provided
  if (topic) blog.topic = topic;
  if (content) blog.content = content;
  if (category) blog.category = category;
  if (tags && Array.isArray(tags)) blog.tags = tags;

  await blog.save();

  return res.status(200).json({
    success: true,
    message: "Blog updated successfully!",
    data: blog,
  });
});


// delete blog
export const deleteBlog = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  // Find blog
  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  // Ensure only owner or Admin can delete
  if (blog.authorId.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
    return next(new ErrorHandler("You are not authorized to delete this blog", 403));
  }

  await blog.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Blog deleted successfully!",
  });
});



// get all topics
export const getTopicsByCategory = TryCatch(
    async(req,res,next)=>{
        const {id} = req.params
        
        const blog = await Blog.findById(id)
        if(!blog){
            return next(new ErrorHandler("Blog not found!", 404))
        }

        const topics = await Blog.find({authorId:req.user._id, category:blog.category}).sort({ createdAt:-1}).select("_id topic").lean()

        return res.status(200).json({
            success:true,
            message:"Blogs fetched successfully!",
            data:topics
        })
        
    }
)


export const getAllCategories = TryCatch(
  async (req, res, next) => {
      // Get unique categories from Blog collection
      const categories = await Blog.find({authorId:req.user._id}).distinct("category")

      return res.status(200).json({
        success: true,
        categories,
      });
  }
);


