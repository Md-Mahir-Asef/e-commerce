import app from "./app";
import { config } from "./config/config";
import logger from "./utils/logger";

app.listen(config.PORT, () => {
    logger.info(`Server is running on http://localhost:${config.PORT}`);
});
