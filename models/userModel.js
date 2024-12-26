import mongoose from "mongoose";
import bcrypt, { getRounds } from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

//Hash password before Saving
userSchema.pre("save", async function () {
    const user = this
    if (!this.isModified('password')) {
        return
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashdpassword = await bcrypt.hash(user.password, salt)
        user.password = hashdpassword
    } catch (error) {
        throw error
    }
})

//Match user's password using bcrypt
userSchema.methods.matchPassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('User', userSchema)
export default User //user table