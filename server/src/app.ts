import express from "express";
import routes from "./routes/index.route";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import cookieParser from "cookie-parser";
import { responseWrapper } from "./middlewares/responseWrapper.middleware";

const app = express();

app.use(cors({ origin: process.env.SERVER_CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(responseWrapper);
app.use("/api/v1", routes);
app.use(requestLogger);

export default app;
