const Joi = require('joi');
const jwt = require('jsonwebtoken');
const Library = require('../models/library');
const Validator = require('../../validation/validation');


// ****************************** Book Create **************************************

async function bookCreate(req, res) {
    try {
        const { error, value } = Validator.libraryValidation.validate(req.body, Validator.options);
        if (error) res.status(400).json({
            message: "Validation Error",
            Error: error.details[0].message
        });
        else {
            const { bookName, author, genre, releaseDate, bookImage, isActivate } = req.body;
            const book = new Library({
                bookName,
                author,
                genre,
                releaseDate,
                bookImage,
                isActivate
            });

            const savedLibraryInfo = await book.save();
            res.status(201).json({
                message: "Book Created Successfully",
                LibraryInfoDetails: savedLibraryInfo
            });
        }
    }
    catch (err) {
        res.status(400).json(err);
    } 
};



// ****************************  Book Update  ************************************

async function bookUpdate(req, res) { 
    try {
        const { error, value } = Validator.libraryValidation.validate(req.body, Validator.options);

        if (error) res.status(400).json({
            message: "Validation Error",
            Error: error.details[0].message
        });
        else {
            const info = await Library.findById(req.params.id);
            info.bookName = req.body.bookName;
            info.author = req.body.author;
            info.genre = req.body.genre;
            info.releaseDate = req.body.releaseDate;
            info.bookImage = req.body.bookImage;
            info.isActivate = req.body.isActivate;

            const bookInfo = await info.save();

            res.status(200).json({
                message: "Update Book Information",
                bookInfo
            });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
}


// ************************  Book Activate ******************************

async function bookActivate(req, res) {
    try {
        const info = await Library.findById(req.params.id);
        info.isActivate = true;

        const bookInfo = await info.save();

        res.status(200).json({
            message: "Successfully Activated.",
            bookInfo
        });
    }
    catch (err) {
      res.status(400).json(err);
    }
};


// ************************  Book Deactivate  ******************************

async function bookDeactivate(req, res) {
    try {
        const info = await Library.findById(req.params.id);
        info.isActivate = false;

        const bookInfo = await info.save();

        res.status(200).json({
            message: "Successfully Deactivated.",
            bookInfo
        });
    }
    catch (err) {
      res.status(400).json(err);
    }
};


// ****************************  Book Delete  **********************************

async function bookDelete(req, res) {
    try {
        const id = req.params.id;
        await Library.findByIdAndDelete({ _id: id });
        res.status(204).json({
            message: "Book delete Successfully.",
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}



module.exports = {
    bookCreate,
    bookUpdate,
    bookActivate,
    bookDeactivate,
    bookDelete
};   
