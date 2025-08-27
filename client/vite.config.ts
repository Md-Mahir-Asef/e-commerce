import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type { UserConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
    const isDev =
        mode === "development" || process.env.NODE_ENV === "development";

    return {
        plugins: [react(), tailwindcss()],
        // production build ignores `server` options, but guard anyway
        server: isDev
            ? {
                  host: true, // 0.0.0.0
                  port: Number(process.env.VITE_DEV_SERVER_PORT || 5173),
                  hmr: {
                      protocol: "ws",
                      host: process.env.VITE_HMR_HOST || "localhost",
                      port: Number(process.env.VITE_DEV_SERVER_PORT || 5173),
                  },
              }
            : undefined,
        // any other shared config
    };
});
