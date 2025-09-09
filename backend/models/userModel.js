import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    password: {
        type:String,
        required:true,
        trim:true
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.verifyPassword = async function (password) {
   let result = await bcrypt.compare(password, this.password)
   return result
}

const User = mongoose.model("User", userSchema)
export default User
