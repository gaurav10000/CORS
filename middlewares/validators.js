

exports.signupValidator = (req, res, next) => {
    const { name, email, password, bio, username } = req.body;

    if(req.body && name && email && password && bio && username){
        next()
    }else {
        res.status(404).json({messgae: "Please fill all the fields"})
    }
}

exports.loginValidator = (req, res, next) => {
    const { username, password } = req.body;
    // console.log("email: ", username, "password", password);
    if(req.body && username && password){
        next()
    }else {
        res.status(404).json({messgae: "Please fill all the fields"})
    }
}