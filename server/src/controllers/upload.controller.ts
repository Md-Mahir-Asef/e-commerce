import { Request, Response } from "express";
import logger from "../utils/logger";
import cloudinary from "../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";

// Endpoint: /api/v1/upload
export const uploadImage = async (req: Request, res: Response) => {
    try {
        console.log("Hit uploadImage Controller Function.");
        if (!req.file) {
            logger.warn("Upload attempt without file");
            res.sendErr({ filename: null }, "No file provided.");
            return;
        }

        const uploadResult: UploadApiResponse = await new Promise(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "robobazar" }, (error, result) => {
                        if (error) reject(error);
                        else resolve(result as UploadApiResponse);
                    })
                    .end(req.file!.buffer);
            },
        );

        logger.info(
            `Image uploaded successfully to Cloudinary: ${uploadResult.secure_url}`,
        );

        res.sendApi(
            {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            },
            "Image uploaded successfully.",
        );
    } catch (err) {
        logger.error(`Image upload failed: ${err}`);

        res.sendErr({ filename: null }, "Failed to upload image.");
    }
};
