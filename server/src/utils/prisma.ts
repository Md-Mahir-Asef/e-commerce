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
        const result =
            await prisma.$queryRaw<{db_name: string}[]>`SELECT current_database() as db_name`;
        console.log(result[0]!.db_name);
        logger.info(`Prisma is connected to DB: ${result[0]!.db_name} at ${dbUrl}`);
    } catch (error) {
        logger.warn(`Can't connect to DB. ${error}`);
    }
};

connectionCheck();

export default prisma;
