import { config as dotenvConfig } from "dotenv";
dotenvConfig({ override: false });

// Validate Cloudinary credentials
const cloudinaryName = process.env["CLOUDINARY_NAME"];
const cloudinaryKey = process.env["CLOUDINARY_KEY"];
const cloudinarySecret = process.env["CLOUDINARY_SECRET"];

if (
    process.env["NODE_ENV"] !== "test" &&
    (!cloudinaryName || !cloudinaryKey || !cloudinarySecret)
) {
    console.warn(
        "Warning: Cloudinary credentials not properly configured. File uploads will fail.",
    );
}

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
    CLIENT_URL_PRODUCTION1: process.env["CLIENT_URL_PRODUCTION1"],
    CLIENT_URL_PRODUCTION2: process.env["CLIENT_URL_PRODUCTION2"],
    CLOUDINARY_URL: process.env["CLOUDINARY_URL"],
    CLOUDINARY_NAME: cloudinaryName,
    CLOUDINARY_KEY: cloudinaryKey,
    CLOUDINARY_SECRET: cloudinarySecret,
};
