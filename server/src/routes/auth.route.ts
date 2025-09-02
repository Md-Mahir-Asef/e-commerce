import { Router } from "express";
import { register, getAllUsers, deleteUser, logIn, logOut } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.get("/users", getAllUsers);
authRoutes.delete("/user/:userId", deleteUser);
authRoutes.post("/login", logIn);
authRoutes.post("/logout/:userId", logOut);

export default authRoutes;
