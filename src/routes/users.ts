import express from "express";
const router = express.Router();

import userController from "../controllers/userController";

router.get("/users", userController.getUsers);
//router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
