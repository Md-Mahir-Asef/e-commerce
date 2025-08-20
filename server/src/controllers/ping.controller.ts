import { Request, Response } from "express";

export const pingResponder = (req: Request, res: Response) => {
    try {
        res.sendApi({ pong: true }, "Successfully connected to server.");
    } catch (err) {
        res.sendErr(err, "Can not connect to server.");
    }
};
