import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";

// Endpoint: /api/v1/health
export const healthCheck = async (req: Request, res: Response) => {
    const base = {
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
    };
    try {
        // Get DB size
        const result = await prisma.$queryRaw<
            { size: string; name: string }[]
        >`SELECT pg_size_pretty(pg_database_size(current_database())) as size, current_database() as name`;

        logger.info(
            `Health check successful. Prisma DB size: ${result[0]?.size}, name: ${result[0]?.name}`
        );

        res.sendApi(
            {
                ...base,
                availability: { database: { ...result[0], available: true } },
            },
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
