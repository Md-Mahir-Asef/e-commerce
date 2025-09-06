process.env.DATABASE_URL =
    process.env.DATABASE_URL || "postgres://test:test@db:5432/test_db";

import { beforeAll, afterAll } from "@jest/globals";
import { execSync } from "node:child_process";
import prisma from "./src/utils/prisma";

beforeAll(async () => {
    execSync("npx prisma db push", { stdio: "inherit" });
});

afterAll(async () => {
    await prisma.$disconnect();
});
