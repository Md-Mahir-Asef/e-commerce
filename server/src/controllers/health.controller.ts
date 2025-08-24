import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";

export const healthCheck = async (req: Request, res: Response) => {
    const base = {
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
    };
    try {
        await prisma.$queryRaw`SELECT 1`;
        logger.info("Health check successful.");
        res.sendApi(
            { ...base, availability: { database: true } },
            "Everything is Ok."
        );
    } catch (err) {
        logger.error("Health check failed.");
        res.sendErr(
            { ...base, availability: { database: false } },
            "Dependency failure."
        );
    }
};
