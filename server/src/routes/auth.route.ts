import { Router } from "express";
import { register, getAllUsers, deleteUser } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.get("/users", getAllUsers);
authRoutes.delete("/user/:userId", deleteUser);

export default authRoutes;
