import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config";

cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_KEY,
    api_secret: config.CLOUDINARY_SECRET,
});

export default cloudinary;
