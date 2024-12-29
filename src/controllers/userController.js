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
