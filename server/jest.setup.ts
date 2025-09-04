import { beforeAll } from "@jest/globals";
import { execSync } from "node:child_process";

beforeAll(() => {
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
});
