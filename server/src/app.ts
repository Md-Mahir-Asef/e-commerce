import express from "express";
import path from "path";
import routes from "./routes/index.route";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import cookieParser from "cookie-parser";
import { responseWrapper } from "./middlewares/responseWrapper.middleware";
import { config } from "./config/config";

const app = express();

const allowedOrigins = [
    config.CLIENT_URL_DEVELOPMENT1,
    config.CLIENT_URL_DEVELOPMENT2,
    config.CLIENT_URL_PRODUCTION1,
    config.CLIENT_URL_PRODUCTION2,
];

app.use(cookieParser());
app.use(
    cors({
        origin: (origin, callback) => {
            // allow requests with no origin (mobile apps, curl)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    }),
);
app.use(express.json());
app.use(responseWrapper);
app.use(requestLogger);
app.use("/api/v1", routes);

export default app;
