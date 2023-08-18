require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const router = require('./Routes/userRoutes.js')
const dbConnect = require('./config/db.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    cors({
        origin:"http://127.0.0.1:5500",
        credentials: true,
    })
)

dbConnect()

app.use('/', router)

module.exports = app