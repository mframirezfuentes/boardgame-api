const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

router.post("/author", authorController.createAuthor);
router.get("/author", authorController.getAuthors);
router.get("/author/:id", authorController.getOneAuthor);
router.put("/author/:id", authorController.updateAuthor);
router.delete("/author/:id", authorController.deleteAuthor);

module.exports = router;
