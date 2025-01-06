import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ email: user.email }, secret!);
    res.status(200).send({ token });
  } catch (error) {
    console.log("Cant sign in", error);
    res.status(500).send({ message: "Cant sign in" });
  }
};

export default {
  login,
};
