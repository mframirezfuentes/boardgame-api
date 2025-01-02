const author = require("../models/author");

const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const newAuthor = await author.createAuthor(name);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.log("Error to create author", error);
    res.status(500).json({ message: "Error to create author" });
  }
};

const getAuthors = async (req, res) => {
  try {
    const authors = await author.getAuthors();
    console.log("authors", authors);
    res.status(200).json(authors);
  } catch (error) {
    console.log("Error to find authors");
    res.status(500).json({ message: "Error to find authors" });
  }
};

const getOneAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const authorData = await author.getOneAuthor(authorId);
    res.status(200).json(authorData);
  } catch (error) {
    console.log("Error to find author");
    res.status(500).json({ message: "Error to find author" });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { name } = req.body;
    await author.updateAuthor(authorId, name);
    res.status(200).json({ message: "Author updated" });
  } catch (error) {
    console.log("Error to update author", error);
    res.status(500).json({ message: "Error to update author" });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    await author.deleteAuthor(authorId);
    res.status(200).json({ message: "Author deleted" });
  } catch (error) {
    console.log("Error to delete author", error);
    res.status(500).json({ message: "Error to delete author" });
  }
};

module.exports = {
  createAuthor,
  getAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
};
