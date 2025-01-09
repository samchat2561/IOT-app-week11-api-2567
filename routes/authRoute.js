import express from 'express'
import { registerUser } from '../controllers/authController.js'

const router = express.Router()

//http://localhost:3000/api/auth/register
router.post('/register', registerUser)

export default router