import User from "../models/userModel.js"


 const seedAdmin = async () => {
    try {
        const admin = await User.findOne({ role: "Admin" })
        if (!admin) {
            await User.create({
                name: "admin",
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                role:"Admin"
            })
            console.log("Admin Created Successfully!")
        }else{
            console.log("Admin already exists!")
        }
    } catch (error) {
        console.log("Admin Creation Error! ", error.message)
    }
}

export default seedAdmin