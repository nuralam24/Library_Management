const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const permit = require('../../middleware/permit');

// Require Controllers
const Library = require("../controllers/library");


// Routes
router.post("/api/library/add-book", auth, permit("librarian"), Library.bookCreate);
router.put("/api/library/update-book/:id", auth, permit("librarian"), Library.bookUpdate);
router.put("/api/library/activate-books/:id", auth, permit("librarian"), Library.bookActivate);
router.put("/api/library/deactivate-books/:id", auth, permit("librarian"), Library.bookDeactivate);
router.delete("/api/library/delete-book/:id", auth, permit("librarian"), Library.bookDelete);


module.exports = router;   
