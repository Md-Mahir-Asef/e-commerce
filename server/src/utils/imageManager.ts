import cloudinary from "./cloudinary";
import logger from "./logger";

/**
 * Validates if a URL is a valid Cloudinary URL
 */
export const isValidCloudinaryUrl = (url: string): boolean => {
    if (!url || typeof url !== "string") return false;

    return (
        url.startsWith("https://res.cloudinary.com/") &&
        url.includes("/image/upload/") &&
        url.startsWith("https://")
    );
};

/**
 * Extracts public ID from Cloudinary URL
 */
export const extractPublicIdFromUrl = (url: string): string | null => {
    if (!isValidCloudinaryUrl(url)) return null;

    // Extract public ID from Cloudinary URL
    // Format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.jpg
    const matches = url.match(
        /\/image\/upload\/(?:v\d+\/)?(.+?\.(jpg|jpeg|png|gif|webp))/,
    );
    return matches && matches[1] ? matches[1] : null;
};

/**
 * Deletes an image from Cloudinary using its public ID
 */
export const deleteCloudinaryImage = async (
    publicId: string,
): Promise<boolean> => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        const success = result.result === "ok";

        if (success) {
            logger.info(`Successfully deleted Cloudinary image: ${publicId}`);
        } else {
            logger.warn(
                `Failed to delete Cloudinary image: ${publicId}, result: ${result.result}`,
            );
        }

        return success;
    } catch (error) {
        logger.error(`Error deleting Cloudinary image ${publicId}:`, error);
        return false;
    }
};

/**
 * Validates and filters an array of image URLs, keeping only valid Cloudinary URLs
 */
export const validateImageArray = (
    images: string[],
): { valid: string[]; invalid: string[] } => {
    const valid: string[] = [];
    const invalid: string[] = [];

    for (const image of images) {
        if (isValidCloudinaryUrl(image)) {
            valid.push(image);
        } else {
            invalid.push(image);
        }
    }

    if (invalid.length > 0) {
        logger.warn(`Found ${invalid.length} invalid image URLs:`, invalid);
    }

    return { valid, invalid };
};

/**
 * Cleans up unused Cloudinary images by comparing old and new image arrays
 */
export const cleanupUnusedImages = async (
    oldImages: string[],
    newImages: string[],
): Promise<{ deleted: string[]; failed: string[] }> => {
    const imagesToDelete = oldImages.filter(
        (oldImg) => !newImages.includes(oldImg),
    );

    const deleted: string[] = [];
    const failed: string[] = [];

    for (const imageUrl of imagesToDelete) {
        const publicId = extractPublicIdFromUrl(imageUrl);
        if (publicId) {
            const success = await deleteCloudinaryImage(publicId);
            if (success) {
                deleted.push(imageUrl);
            } else {
                failed.push(imageUrl);
            }
        } else {
            logger.warn(`Could not extract public ID from URL: ${imageUrl}`);
            failed.push(imageUrl);
        }
    }

    return { deleted, failed };
};

/**
 * Deletes all Cloudinary images associated with a product
 */
export const deleteAllProductImages = async (
    images: string[],
): Promise<{ deleted: string[]; failed: string[] }> => {
    const deleted: string[] = [];
    const failed: string[] = [];

    for (const imageUrl of images) {
        const publicId = extractPublicIdFromUrl(imageUrl);
        if (publicId) {
            const success = await deleteCloudinaryImage(publicId);
            if (success) {
                deleted.push(imageUrl);
            } else {
                failed.push(imageUrl);
            }
        } else {
            // Skip non-Cloudinary URLs (legacy data)
            logger.info(`Skipping non-Cloudinary image: ${imageUrl}`);
        }
    }

    return { deleted, failed };
};

/**
 * Validates a single image URL with detailed error information
 */
export const validateImageUrl = (
    url: string,
): { isValid: boolean; error?: string } => {
    if (!url) {
        return { isValid: false, error: "Image URL is required" };
    }

    if (typeof url !== "string") {
        return { isValid: false, error: "Image URL must be a string" };
    }

    if (!url.startsWith("https://")) {
        return { isValid: false, error: "Image URL must use HTTPS" };
    }

    if (!url.startsWith("https://res.cloudinary.com/")) {
        return { isValid: false, error: "Image URL must be from Cloudinary" };
    }

    if (!url.includes("/image/upload/")) {
        return {
            isValid: false,
            error: "Image URL must be a valid Cloudinary image upload URL",
        };
    }

    // Basic URL format validation
    try {
        new URL(url);
        return { isValid: true };
    } catch {
        return { isValid: false, error: "Invalid URL format" };
    }
};
