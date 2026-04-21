import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";
import { config } from "../config/config";
import logger from "./logger";

const dbUrl =
    config.DATABASE_URL_PRODUCTION ||
    config.DATABASE_URL_DEVELOPMENT ||
    config.DATABASE_URL;

// const connectionString = `${process.env?.["DATABASE_URL"]}`;
const adapter = new PrismaPg({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });

const connectionCheck = async () => {
    try {
        const [sizeResult] = await prisma.$queryRaw<
            { size: string }[]
        >`SELECT pg_size_pretty(pg_database_size(current_database())) as size`;
        logger.info(`Database size is ${sizeResult?.size}`);
        const [nameResult] = await prisma.$queryRaw<
            { name: string }[]
        >`SELECT current_database()::text as name`;
        logger.info(`Database name is ${nameResult?.name}`);
        logger.info(
            `Prisma is connected to DB: ${nameResult?.name} at ${dbUrl}. Database size: ${sizeResult?.size}`,
        );
    } catch (error) {
        logger.warn(
            `ERROR ON PRISMA INITIAL CONNECTION AND INITIAL HEALTH CHECK.\nCan't connect to DB. ${error}`,
        );
    }
};

connectionCheck();

export default prisma;
