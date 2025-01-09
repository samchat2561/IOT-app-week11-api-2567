import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'

//Generate JWT token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_KEY })
}

//1.Register new user: http://localhost:3000/api/auth/register
export const registerUser = async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).jsom({ status: false, message: "User already exists" })
        }

        //Create new users
        const user = await User.create({ username, email, password, firstName, lastName })
        console.log(`${user.username} ${user.email}`)
        const data = {
            id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
        }
        return res.status(201).json({ status: true, message: "Registered Successfully", User: data })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
//2.Login new user
export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ status: true, message: "User Not Found" })
        }

        if (user && (await user.matchPassword(password))) {
            const tokenData = generateToken(user.id)
            console.log(`${user.email} ${user.password}`)
            console.log(`${tokenData}`)

            const data = {
                id: user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                token: tokenData
            }
            return res.status(201).json({ status: true, message: "success", User: data })
        } else {
            return res.status(401).json({ status: false, message: 'not success' })
        }

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
//3.Profile user