import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export const config = {
    PORT: Number(process.env["PORT"]) || 3000,
    NODE_ENV: process.env["NODE_ENV"] || "development",
    DATABASE_URL_PRODUCTION: process.env["DATABASE_URL_PRODUCTION"],
    DATABASE_URL_DEVELOPMENT: process.env["DATABASE_URL_DEVELOPMENT"],
};
