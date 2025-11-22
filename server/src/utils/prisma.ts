import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";
import { config } from "../config/config";
import logger from "./logger";

const dbUrl =
    config.NODE_ENV === "production"
        ? config.DATABASE_URL_PRODUCTION!
        : config.DATABASE_URL_DEVELOPMENT!;

const connectionString = `${process.env?.["DATABASE_URL"]}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const connectionCheck = async () => {
    try {
        const result = await prisma.$queryRaw<
            { size: string; name: string }[]
        >`SELECT pg_size_pretty(pg_database_size(current_database())) as size, current_database() as name`;
        logger.info(
            `Prisma is connected to DB: ${result[0]?.name} at ${dbUrl}. Database size: ${result[0]?.size}`
        );
    } catch (error) {
        logger.warn(
            `ERROR ON PRISMA INITIAL CONNECTION AND INITIAL HEALTH CHECK.\nCan't connect to DB. ${error}`
        );
    }
};

connectionCheck();

export default prisma;
