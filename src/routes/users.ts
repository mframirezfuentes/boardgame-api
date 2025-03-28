import express from "express";
const router = express.Router();
import authenticateToken from "../middlewares/authMiddlerware";
import userController from "../controllers/userController";

router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.put("/users/:id", authenticateToken, userController.updateUser);
router.delete("/users/:id", authenticateToken, userController.deleteUser);

export default router;
