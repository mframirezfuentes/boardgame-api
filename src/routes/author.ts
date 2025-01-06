import express from"express";
import authorController from "../controllers/authorController";
const router = express.Router();


router.post("/author", authorController.createAuthor);
router.get("/author", authorController.getAuthors);
router.get("/author/:id", authorController.getOneAuthor);
router.put("/author/:id", authorController.updateAuthor);
router.delete("/author/:id", authorController.deleteAuthor);

export default router;
