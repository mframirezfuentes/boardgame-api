const boardgame = require("../models/boardgame");

exports.createBoardgame = async (req, res) => {
  try {
    const { title, year, author } = req.body;
    const newBoardgame = await boardgame.createBoardgame(title, year, author);
    res.status(201).json(newBoardgame);
  } catch (error) {
    console.log("Error to create boardgame", error);
    res.status(500).json({ message: "Error to create boardgame" });
  }
};

exports.getBoardgame = async (req, res) => {
  try {
    const boardgames = await boardgame.getBoardgame();
    console.log("boardgames", boardgames);
    res.status(200).json(boardgames);
  } catch (error) {
    console.log("Error to find boardgames");
    res.status(500).json({ message: "Error to find boardgames" });
  }
};
exports.getOneBoardgame = async (req, res) => {
  try {
    const boardgameId = req.params.id;
    const boardgameData = await boardgame.getOneBoardgame(boardgameId);
    res.status(200).json(boardgameData);
  } catch (error) {
    console.log("Error to find boardgame");
    res.status(500).json({ message: "Error to find boardgame" });
  }
};

exports.updateBoardgame = async (req, res) => {
  try {
    const boardgameId = req.params.id;
    const { name, year, description } = req.body;
    await boardgame.updateBoardgame(boardgameId, name, year, description);
    res.status(200).json({ message: "Boardgame updated" });
  } catch (error) {
    console.log("Error to update boardgame", error);
    res.status(500).json({ message: "Error to update boardgame" });
  }
};

exports.deleteBoardgame = async (req, res) => {
  try {
    const boardgameId = req.params.id;
    await boardgame.deleteBoardgame(boardgameId);
    res.status(200).json({ message: "Boardgame deleted" });
  } catch (error) {
    console.log("Error to delete boardgame", error);
    res.status(500).json({ message: "Error to delete boardgame" });
  }
};
