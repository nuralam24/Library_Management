const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Library = require('../models/library');
const secret = require('../../config/secretToken');
const Validator = require('../../validation/validation');


// ****************************** SignUp **************************************

async function signUp(req, res) {
    try {
        const { error, value } = Validator.registrationValidation.validate(req.body, Validator.options);

        if (error) res.status(400).json({
            message: "Validation Error",
            Error: error.details[0].message
        });
        else {
            const emailExist = await User.findOne({ email: req.body.email });
            if (emailExist) return res.status(400).send('Email already exists');

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const { userType, name, email, password } = req.body;
            const user = new User({
                userType,
                name,
                email,
                password: hashedPassword
            });

            const savedUser = await user.save();
            res.status(201).json({
                message: "User Created Successfully",
                userDetails: savedUser
            });
        }
    }
    catch (err) {
        res.status(400).json(err);
    } 
};



// ****************************  SingIn  ************************************

async function signIn(req, res) { 
    try {
        const { error, value } = Validator.loginValidation.validate(req.body, Validator.options);

        if (error) res.status(400).json({
            message: "Validation Error",
            Error: error.details[0].message
        });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: "Email is not found" })
        
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).json({ message: 'Invalid Password' })
        else {
            const token = jwt.sign({ _id: user._id , userType: user.userType}, secret);
            res.header('auth-token', token).status(201).json({
                message: 'Yes, Logged in',
                token
            })
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
}



// *************************  Get Single books by student  ********************************

async function getSingleBook(req, res) {
    try {
        const result = await Library.findById(req.params.id);
        res.status(200).json({
            message: "Single Books.",
            SingleBook: result
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
};



// *************************  Get all books by student  ********************************

async function getAllBooks(req, res) {
    try {
        const result = await Library.find({ isActivate: true });
        res.status(200).json({
            message: "All Books.",
            AllBooks: result
        });
    }
    catch (err) {
      res.status(400).json(err);
    }
};



module.exports = {
    signUp,
    signIn,
    getSingleBook,
    getAllBooks
};   
