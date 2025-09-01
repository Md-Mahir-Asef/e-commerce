import jwt from "jsonwebtoken";
import { config } from "../config/config";

const SECRET = config.SERVER_JWT_SECRET as string;

export const generateToken = (payload: object): string => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "7d" });
  return token;
};