const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


const create_token = (id)=>{
    return jwt.sign({id:id} ,process.env.SECRET, {expiresIn: '1h'})
}

// Login User
const loginUser = async (req, res) => {}


// Signup User
const signupUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.signup(email, password);

        // Generate and return a token
        const token = create_token(user._id);

        res.status(201).json({email, token});
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}


module.exports = {
    loginUser,
    signupUser
}