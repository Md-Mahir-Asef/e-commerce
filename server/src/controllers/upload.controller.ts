import { Request, Response } from "express";
import logger from "../utils/logger";

// Endpoint: /api/v1/upload
export const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            logger.warn("Upload attempt without file");
            res.sendErr({ filename: null }, "No file provided.");
            return;
        }

        const fileUrl = `/uploads/${req.file.filename}`;

        logger.info(`Image uploaded successfully: ${req.file.filename}`);

        res.sendApi(
            {
                filename: req.file.filename,
                path: fileUrl,
                size: req.file.size,
                mimetype: req.file.mimetype,
            },
            "Image uploaded successfully.",
        );
    } catch (err) {
        logger.error(`Image upload failed: ${err}`);

        res.sendErr({ filename: null }, "Failed to upload image.");
    }
};
