import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotev from "dotenv";

dotev.config();

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send({ message: "No token provided" });
  }

  jwt.verify(token!, secret!, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: "Unauthorized" });
    }
    (req as any).user = decoded; 
    next();
  });
};

export default authenticateToken;
