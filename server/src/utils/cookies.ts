import { Response, CookieOptions } from "express";
import { config } from "../config/config";

export function setTokenCookie(res: Response, token: string, options: CookieOptions = {}) {
    const isProduction = config.NODE_ENV === "production";
    const defaultOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction, // secure in prod
        sameSite: isProduction ? "none" : "lax", // cross-domain in prod
        domain: isProduction ? "backend.com" : undefined, // set only in prod
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    };

    res.cookie("token", token, { ...defaultOptions, ...options });
}