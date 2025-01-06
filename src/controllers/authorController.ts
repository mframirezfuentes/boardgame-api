import { Request, Response } from "express";
import author from "../models/author";

const createAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const newAuthor = await author.createAuthor(name);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.log("Error to create author", error);
    res.status(500).json({ message: "Error to create author" });
  }
};

const getAuthors = async (_req: Request, res: Response): Promise<void> => {
  try {
    const authors = await author.getAuthors();
    res.status(200).json(authors);
  } catch (error) {
    console.log("Error to find authors");
    res.status(500).json({ message: "Error to find authors" });
  }
};

const getOneAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorId = req.params.id;
    const authorData = await author.getOneAuthor(authorId);
    res.status(200).json(authorData);
  } catch (error) {
    console.log("Error to find author");
    res.status(500).json({ message: "Error to find author" });
  }
};

const updateAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    await author.updateAuthor(id);
    res.status(200).json({ message: "Author updated" });
  } catch (error) {
    console.log("Error to update author", error);
    res.status(500).json({ message: "Error to update author" });
  }
};

const deleteAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorId = req.params.id;
    await author.deleteAuthor(authorId);
    res.status(200).json({ message: "Author deleted" });
  } catch (error) {
    console.log("Error to delete author", error);
    res.status(500).json({ message: "Error to delete author" });
  }
};

export default {
  createAuthor,
  getAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
};
