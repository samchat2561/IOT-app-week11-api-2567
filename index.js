import express from 'express'
import logger from 'morgan'
import connectMongoDB from './config/db.js'
import authRoute from './routes/authRoute.js'

const app = express()

const PORT = process.env.PORT || 8000

connectMongoDB() //Connected to mongoDB Database
app.use(logger('dev'))//Logging middleware

app.use(express.json())//Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })) //parse application/x-www-form-urlencoded

//route for home page
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'API Mobile-App' })
})

//GET API: http://localhost:3000/
app.use('/api/auth', authRoute) //Auth route


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})