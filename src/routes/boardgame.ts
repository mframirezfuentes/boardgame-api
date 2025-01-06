import express from "express";
import boardgameController from "../controllers/boardgameController";
import authenticateToken from "../middlewares/authMiddlerware";
const router = express.Router();

router.post(
  "/boardgame",
  authenticateToken,
  boardgameController.createBoardgame
);
router.get("/boardgame", boardgameController.getBoardgame);
router.get("/boardgame/:id", boardgameController.getOneBoardgame);
router.put(
  "/boardgame/:id",
  authenticateToken,
  boardgameController.updateBoardgame
);
router.delete(
  "/boardgame/:id",
  authenticateToken,
  boardgameController.deleteBoardgame
);

export default router;
