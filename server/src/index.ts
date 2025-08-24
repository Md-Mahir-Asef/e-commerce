import app from "./app";
import { config } from "./config/config";
import logger from "./utils/logger";

app.listen(config.PORT, "0.0.0.0", () => {
    logger.info(`Server is running on http://localhost:${config.PORT}`);
});
