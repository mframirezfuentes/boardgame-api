import { Request, Response } from "express";
import User from "../models/users";
import userModel from "../models/boardgame";

const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error to find users");
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void>  => {
  try {
    const { name, email, password } = req.body;

    try {
      const newUser = new User({ name, email, password });
      await newUser.save();
      await userModel.createUser(name, email);
       res
        .status(201)
        .json({ message: "Usuario creado con éxito", user: newUser });
    } catch (error) {
      console.log("Error al crear usuario en Neo4j:", error);
       res
        .status(500)
        .json({ message: "Error al crear usuario en Neo4j" });
    }
  } catch (error) {
    console.log("Can not to create user");
     res.status(500).send("error to create user");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.log("Error to delete user", error);
    res.status(500).json({ message: "Error to delete user" });
  }
};

const updateUser = async (req: Request, res: Response) => {
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

export default { getUsers, deleteUser, updateUser, createUser };
