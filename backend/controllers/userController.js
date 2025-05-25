const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
//bcrypt is used for hashing passwords
const jwt = require('jsonwebtoken');
//jsonwebtoken is used for creating and verifying tokens

//adesc Register a new user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error("User already exists with this email");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log('Hashed Password:', hashedPassword);  //just for checking if it works
    //create user
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    });

    console.log('User created:', user); //just for checking if it works
    if (user) {
        res.status(201).json({
            _id: user.id,
            userName: user.userName,
            email: user.email
        });
        return;
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: 'User registered successfully' });
});


//adesc Login a user 
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async  (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    //check if user exists
    const user = await User.findOne({ email });
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        //create token
        const accesstoken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        res.status(200).json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            accesstoken
        });
        return;
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    res.json({ message: 'User logged in successfully' });
});

//adesc Get current user
//@route GET /api/users/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'information about the current user' });
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};