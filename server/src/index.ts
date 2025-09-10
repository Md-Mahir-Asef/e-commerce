import app from "./app";
import { config } from "./config/config";
import logger from "./utils/logger";

const port = config.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
    logger.info(`Server is running on http://localhost:${port}`);
});
