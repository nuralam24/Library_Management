const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');

// Require Controllers
const User = require("../controllers/user"); 


// Routes
router.post("/api/user/signup", User.signUp);
router.post("/api/user/signin", User.signIn);

router.get("/api/library/all-books", auth, User.getAllBooks); 
router.get("/api/library/single-book/:id", auth, User.getSingleBook);


module.exports = router; 

