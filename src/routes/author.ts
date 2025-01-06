import express from "express";
import authorController from "../controllers/authorController";
import authenticateToken from "../middlewares/authMiddlerware";
const router = express.Router();

router.post("/author", authenticateToken, authorController.createAuthor);
router.get("/author", authorController.getAuthors);
router.get("/author/:id", authorController.getOneAuthor);
router.put("/author/:id", authenticateToken, authorController.updateAuthor);
router.delete("/author/:id", authenticateToken, authorController.deleteAuthor);

export default router;
