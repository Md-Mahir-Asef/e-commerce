import { config as dotenvConfig } from "dotenv";
dotenvConfig({ override: false });

export const config = {
    PORT: Number(process.env["PORT"]) || 3000,
    NODE_ENV: process.env["NODE_ENV"] || "development",
    DATABASE_URL_PRODUCTION: process.env["DATABASE_URL_PRODUCTION"],
    DATABASE_URL_DEVELOPMENT: process.env["DATABASE_URL_DEVELOPMENT"],
    DATABASE_URL: process.env["DATABASE_URL"],
    SERVER_BCRYPT_SALT_ROUND: process.env["SERVER_BCRYPT_SALT_ROUND"],
    SERVER_JWT_SECRET: process.env["SERVER_JWT_SECRET"],
    CLIENT_URL_DEVELOPMENT1: process.env["CLIENT_URL_DEVELOPMENT1"],
    CLIENT_URL_DEVELOPMENT2: process.env["CLIENT_URL_DEVELOPMENT2"],
    CLIENT_URL_PRODUCTION: process.env["CLIENT_URL_PRODUCTION"],
};
