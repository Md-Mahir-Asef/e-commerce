import bcrypt from "bcrypt";
import { config } from "../config/config";

const ROUND = Number(config.SERVER_BCRYPT_SALT_ROUND ?? 10);

export const hasher = (data: string): string => {
    if (typeof data !== "string") {
        throw new Error("Hasher expects a string");
    }
    const salt = bcrypt.genSaltSync(ROUND);
    const hashedData = bcrypt.hashSync(data, salt);
    return hashedData;
};
