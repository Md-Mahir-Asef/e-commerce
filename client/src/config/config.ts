interface Config {
    port: number;
    clientEnv: string;
    serverBaseURL: string;
}

export const config: Config = {
    port: import.meta.env.PORT,
    clientEnv: import.meta.env.CLIENT_ENV,
    serverBaseURL: import.meta.env.SERVER_BASE_URL,
};
