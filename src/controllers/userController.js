const User = require("../models/users");
const userModel = require("../models/boardgame");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error to find users");
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    try {
      await userModel.createUser(name, email);
    } catch (error) {
      console.log("Error al crear usuario en Neo4j:", error);
      return res
        .status(500)
        .json({ message: "Error al crear usuario en Neo4j" });
    }

    res
      .status(201)
      .json({ message: "Usuario creado con éxito", user: newUser });
  } catch (error) {
    console.log("Can not to create user");
    res.status(500).send("error to create user");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.log("Error to delete user", error);
    res.status(500).json({ message: "Error to delete user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    await User.findByIdAndUpdate(id, { name, email, password });
    res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    console.log("error to update user", error);
    res.status(500).json({ message: "Error to update user" });
  }
};
