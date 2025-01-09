import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'

const router = express.Router()

//1.http://localhost:3000/api/auth/register
router.post('/register', registerUser)

//2.http://localhost:3000/api/auth/login
router.post('/login', loginUser)
export default router