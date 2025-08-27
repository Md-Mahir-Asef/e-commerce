const isProduction = import.meta.env.VITE_NODE_ENV === "production";
const serverBaseUrl = isProduction
    ? import.meta.env.VITE_SERVER_PRODUCTION_BASE_URL
    : import.meta.env.VITE_SERVER_DEVELOPMENT_BASE_URL;

export const config = {
    VITE_PORT: import.meta.env.VITE_PORT,
    VITE_SERVER_BASE_URL: serverBaseUrl,
};
