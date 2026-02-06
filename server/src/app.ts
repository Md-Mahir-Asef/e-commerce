import express from "express";
import path from "path";
import routes from "./routes/index.route";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import cookieParser from "cookie-parser";
import { responseWrapper } from "./middlewares/responseWrapper.middleware";
import { config } from "./config/config";

const app = express();

app.use(cookieParser());
app.use(
    cors({
        origin: config.CLIENT_URL_DEVELOPMENT,
        credentials: true,
    }),
);
app.use(express.json());
app.use("/api/v1/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(responseWrapper);
app.use(requestLogger);
app.use("/api/v1", routes);

export default app;
