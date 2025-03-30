import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../models/users";
import userModel from "../models/boardgame";
import { IUser } from "../utils/IRole";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "El email ya está registrado" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(req.body.email)) {
      res.status(400).json({ error: "Email inválido" });
    }

    const userId = uuidv4();
    const newUser = new User<IUser>({ userId, name, email, password });
    await newUser.save();

    try {
      await userModel.createUser(userId, name, email);

      res
        .status(201)
        .json({ message: "Usuario creado con éxito", user: newUser });
    } catch (error) {
      console.error("Error al crear usuario en Neo4j:", error);
      await User.findByIdAndDelete(newUser._id);

      res.status(500).json({
        message:
          "Error al crear usuario en Neo4j, usuario eliminado de MongoDB",
      });
    }
  } catch (error) {
    console.error("Error al crear usuario en MongoDB:", error);
    res.status(500).send("Error al crear usuario");
  }
};

export default { createUser };
