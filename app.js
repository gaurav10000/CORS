require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
// app.use(express.cookieParser)
app.use(cors({
    origin: "127.0.0.1:5500",
    credentials: true,
}))


app.post('/register', (req, res) => {
    console.log(req.body);
    // res.setHeader('Access-Control-Allow-Origin', 'http:s//localhost:5500')
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // res.setHeader('Access-Control-Allow-Headers', 'content-type')
    res.status(200).json({
        success: true,
        message: "./register is working"
    })
})

app.post('/login', (req, res) => {
    console.log(req.body);
    // res.setHeader('Access-Control-Allow-Origin', '127.0.0.1:5500')
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // res.setHeader('Access-Control-Allow-Headers', 'content-type')
    res.status(200).json({
        success: true,
        message: "./login is working"
    })
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

module.exports = app