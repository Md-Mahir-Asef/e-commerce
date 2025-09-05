import { config } from "../config/config";
import { PrismaClient } from "@prisma/client";
import logger from "./logger";

const isProd = config.NODE_ENV === "production";
const dbUrl = isProd
    ? config.DATABASE_URL_PRODUCTION!
    : config.DATABASE_URL_DEVELOPMENT!;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: dbUrl,
        },
    },
});
const connectionCheck = async () => {
    try {
        const result = await prisma.$queryRaw<
            { size: string; name: string }[]
        >`SELECT pg_size_pretty(pg_database_size(current_database())) as size, current_database() as name`;
        logger.info(
            `Prisma is connected to DB: ${result[0]?.name} at ${dbUrl}. Database size: ${result[0]?.size}`
        );
    } catch (error) {
        logger.warn(`ERROR ON PRISMA INITIAL CONNECTION AND INITIAL HEALTH CHECK.\nCan't connect to DB. ${error}`);
    }
};

connectionCheck();

export default prisma;
