import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    topic:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
    serialNo:{
        type:Number,
    },
    content:{
        type:String,
        trim:true
    },
    tags:{
        type:[String],
        default:[]
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, {timestamps:true})


const Blog = mongoose.model("Blog", blogSchema)

export default Blog