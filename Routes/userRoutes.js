const express = require('express')
const router = express.Router()
const {register, login, home, getUserDetails} = require('../controllers/userController.js')
const { signupValidator, loginValidator } = require('../middlewares/validators.js')
const { authenticateUser } = require('../middlewares/authenticateUser.js')

router.post('/register',signupValidator, register)

router.post('/login',loginValidator, login)

router.get('/', authenticateUser , getUserDetails)

module.exports = router