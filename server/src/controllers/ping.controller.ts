import { Request, Response } from "express";

export const pingResponder = (req: Request, res: Response) => {
    res.status(200).json({});
};
