const JWT = require('jsonwebtoken')

exports.authenticateUser = async (req, res, next) => {
    const token = req.cookies.token || null
    if(!token) {
        return res.status(404).json({message: "User authentication actually failed", token: req.cookies.token})
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET)
        const { id, username } = payload
        req.user = {id: payload.id, username: payload.username}
        next()
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `User authentication failed because ${error.message}` 
        })
    }
}