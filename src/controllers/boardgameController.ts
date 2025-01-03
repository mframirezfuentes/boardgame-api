import { Request, Response } from "express";
import boardgame from "../models/boardgame";

exports.createBoardgame = async (req: Request, res: Response) => {
  try {
    const { title, year, author } = req.body;
    const newBoardgame = await boardgame.createBoardgame(title, year, author);
    res.status(201).json(newBoardgame);
  } catch (error) {
    console.log("Error to create boardgame", error);
    res.status(500).json({ message: "Error to create boardgame" });
  }
};

exports.getBoardgame = async (_req: Request, res: Response) => {
  try {
    const boardgames = await boardgame.getBoardgame();
    return res.status(200).json(boardgames);
  } catch (error) {
    console.log("Error to find boardgames");
    return res.status(500).json({ message: "Error to find boardgames" });
  }
};
exports.getOneBoardgame = async (req: Request, res: Response) => {
  try {
    const boardgameId = req.params.id;
    const boardgameData = await boardgame.getOneBoardgame(boardgameId);
    res.status(200).json(boardgameData);
  } catch (error) {
    console.log("Error to find boardgame");
    res.status(500).json({ message: "Error to find boardgame" });
  }
};

exports.updateBoardgame = async (req: Request, res: Response) => {
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

exports.deleteBoardgame = async (req: Request, res: Response) => {
  try {
    const boardgameId = req.params.id;
    await boardgame.deleteBoardgame(boardgameId);
    res.status(200).json({ message: "Boardgame deleted" });
  } catch (error) {
    console.log("Error to delete boardgame", error);
    res.status(500).json({ message: "Error to delete boardgame" });
  }
};
