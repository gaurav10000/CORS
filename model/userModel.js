const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: false,
    },
    bio: {
        type: String,
        max: 1024, // 1KB
    }
})
// making a method to generate jwttoken
userSchema.methods = {
    jwtToken(){
        return JWT.sign({id: this._id, username: this.username}, process.env.SECRET, {
            expiresIn: '60m'
        })
    }
}

// to hash password before saving it
userSchema.pre('save', async function(next) {
    if (!this.isModified('password') ) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    return next()
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel