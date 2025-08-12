import { config as dotenvConfig } from "dotenv";
dotenvConfig();

interface Config {
    port: number;
    nodeEnv: string;
}

export const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
};
