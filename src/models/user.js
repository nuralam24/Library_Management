const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    userType: { // librarian or student
        type: String,
        required: true,
        min: 1,
        default: "student",
        enum: ["student", "librarian"]
    }, 
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        unique: true,
      },
    password: {
        type: String,
        required: true,
        minlength: 5,
        
    }, 
});

module.exports = mongoose.model("user", userSchema);