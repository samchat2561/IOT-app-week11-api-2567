import User from "../models/userModel.js"

//1.Register new user
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
        return res.status(201).json({ status: true, message: "Registered Successfully", User: user })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
//2.Login new user

//3.Profile user