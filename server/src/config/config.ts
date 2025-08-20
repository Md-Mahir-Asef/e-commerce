import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export const config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
};
