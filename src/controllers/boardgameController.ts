import { Request, Response } from "express";
import boardgame from "../models/boardgame";

const createBoardgame = async (req: Request, res: Response) => {
  try {
    const { title, year, author } = req.body;
    const newBoardgame = await boardgame.createBoardgame(title, year, author);
    res.status(201).json(newBoardgame);
  } catch (error) {
    console.log("Error to create boardgame", error);
    res.status(500).json({ message: "Error to create boardgame" });
  }
};

const getBoardgame = async (_req: Request, res: Response): Promise<void> => {
  try {
    const boardgames = await boardgame.getBoardgame();
    res.status(200).json(boardgames);
  } catch (error) {
    console.log("Error to find boardgames");
    res.status(500).json({ message: "Error to find boardgames" });
  }
};
const getOneBoardgame = async (req: Request, res: Response) => {
  try {
    const boardgameId = req.params.id;
    const boardgameData = await boardgame.getOneBoardgame(boardgameId);
    res.status(200).json(boardgameData);
  } catch (error) {
    console.log("Error to find boardgame");
    res.status(500).json({ message: "Error to find boardgame" });
  }
};

const updateBoardgame = async (req: Request, res: Response) => {
  try {
    const boardgameId = req.params.id;
    const { title, year } = req.body;
    await boardgame.updateBoardgame(boardgameId, title, year);
    res.status(200).json({ message: "Boardgame updated" });
  } catch (error) {
    console.log("Error to update boardgame", error);
    res.status(500).json({ message: "Error to update boardgame" });
  }
};

const deleteBoardgame = async (req: Request, res: Response) => {
  try {
    const boardgameId = req.params.id;
    await boardgame.deleteBoardgame(boardgameId);
    res.status(200).json({ message: "Boardgame deleted" });
  } catch (error) {
    console.log("Error to delete boardgame", error);
    res.status(500).json({ message: "Error to delete boardgame" });
  }
};

export default {
  createBoardgame,
  getBoardgame,
  getOneBoardgame,
  updateBoardgame,
  deleteBoardgame,
};
