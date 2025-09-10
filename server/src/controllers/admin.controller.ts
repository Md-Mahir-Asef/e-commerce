import { Request, Response } from "express";

export const adminLogin = (req: Request, res: Response) => {
    try {
        res.sendApi({ admin: "admin" }, "Can Hit Admin Login Route.");
    } catch (err) {
        console.log(err);
    }
};
