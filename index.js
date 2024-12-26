import express from 'express'
import logger from 'morgan'
import connectMongoDB from './config/db.js'

const app = express()

const PORT = process.env.PORT || 8000

connectMongoDB() //Connected to mongoDB Database
app.use(logger('dev'))//Logging middleware

app.use(express.json())//Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })) //parse application/x-www-form-urlencoded

//GET API: http://localhost:3000/
app.get('/', (req, res) => {
    // res.send('Hello World!')
    return res.status(200).json({ message: 'API Mobile-App' })
})

//Reading content-type POST API: http://localhost:3000/
app.post('/', (req, res) => {
    console.log('Received data:', req.body)
    // console.log('Name:', req.body.name)
    // console.log('Email:', req.body.email)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})