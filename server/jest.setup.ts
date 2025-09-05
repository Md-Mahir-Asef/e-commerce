process.env.DATABASE_URL =
    process.env.DATABASE_URL || "postgres://test:test@db:5432/test_db";

import { beforeAll, afterAll } from "@jest/globals";
import { execSync } from "node:child_process";
import prisma from "./src/utils/prisma";

beforeAll(async () => {
    execSync("npx prisma migrate reset --force", { stdio: "inherit" });
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
    );
});

afterAll(async () => {
    await prisma.$disconnect();
});
