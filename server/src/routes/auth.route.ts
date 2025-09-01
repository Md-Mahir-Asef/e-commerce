import { Router } from "express";
import { register, getAllUsers } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.get("/users", getAllUsers);

export default authRoutes;
