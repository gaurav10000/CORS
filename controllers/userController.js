
const userModel = require('../model/userModel.js')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')




const register = async (req, res) => {
    try{
        
        const {username, email} = req.body
        const user = await userModel.findOne({username, email})
        if(user){
            return res.status(401).json({
                success: false,
                message: "Account with this email already exists"
            })
        }
        const userInfo = await  userModel(req.body)

        const result = userInfo.save()
        res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    }catch{(error) => {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }}
}

const login = async (req, res) => {
    try {
        
        // console.log(req.body);

    // destructuring email and password from req.body
    const { username, password } = req.body

    // checking in thw database if the user exists or not
    const user = await userModel.findOne({ username }).select('+password')
    // if user not exist then we will send response saying user with this mail doesnot exist
    if(!user){
        return res.status(404).json({
            success: false,
            message: "no account with this username"
        })
    }

    // if user existthen we will check if password is correct or not
    const isPasswordCorrect = await bcrypt.compareSync(password, user.password)

    if(!isPasswordCorrect){
        return res.status(403).json({
            success: false,
            messgae: "email or password is incorrect"
        })
    }

    // Now since both email and password are correct then we will generate a token for user which will allow him to access his account for sometime
    
    // const token = await user.jwtToken()
    const token = await user.jwtToken()

    const cookieOption = {
        maxAge: 10 * 1000,
        Expires: 10 * 1000,
        httpOnly: true, // not able to modify cookie from client side
        SameSite: 'None',
        secure: true,
    }
    // console.log(token, cookieOption);
    // setting cookie in response
    res.cookie("token", token, cookieOption)
    
    res.status(200).json({
        success: true,
        data: user
    })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}
// get user details
const getUserDetails = async (req, res) => {

    const { id, username } = req.user
    try {
        const user = await userModel.findById(`${id}`)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(501).json({message: error.message})
    }
}











module.exports = {
    register,
    login,
    getUserDetails
}