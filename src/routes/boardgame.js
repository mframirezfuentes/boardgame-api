const express = require("express");
const router = express.Router();
const boardgameController = require("../controllers/boardgameController");

router.post("/boardgame", boardgameController.createBoardgame);
router.get("/boardgame", boardgameController.getBoardgame);
router.put("/boardgame/:id", boardgameController.updateBoardgame);
router.delete("/boardgame/:id", boardgameController.deleteBoardgame);

module.exports = router;