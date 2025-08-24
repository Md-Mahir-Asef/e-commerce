import { config } from "../config/config";
import { PrismaClient } from "@prisma/client";

const isProd = config.NODE_ENV === "production";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: isProd
                ? config.DATABASE_URL_PRODUCTION!
                : config.DATABASE_URL_DEVELOPMENT!,
        },
    },
});

export default prisma;
