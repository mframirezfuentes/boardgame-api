import express from"express";
import boardgameController from "../controllers/boardgameController";
const router = express.Router();


router.post("/boardgame", boardgameController.createBoardgame);
router.get("/boardgame", boardgameController.getBoardgame);
router.get("/boardgame/:id", boardgameController.getOneBoardgame);
router.put("/boardgame/:id", boardgameController.updateBoardgame);
router.delete("/boardgame/:id", boardgameController.deleteBoardgame);

export default router;