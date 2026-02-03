import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";
import {
    ProductDataSchema,
    UpdateProductDataSchema,
} from "../utils/zodSchemas";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        logger.info(`Successfully got all ${products.length} products.`);
        res.sendApi(products, "Successfully got all products");
    } catch (err) {
        logger.error(`FAILED GET PRODUCTS QUERY. \n ${err}`);
        res.sendErr(err, "Failed Get Products Query.");
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = ProductDataSchema.parse(req.body.data);
        const {
            name,
            description,
            price,
            rating,
            discountPrice,
            images,
            categoryNames,
        } = productData;
        const newProduct = await prisma.product.create({
            data: {
                name,
                description: description ?? undefined,
                price,
                rating,
                discountPrice: discountPrice ?? price,
                images,
                categories: {
                    connect: categoryNames.map((name) => ({ name })),
                },
            },
        });
        logger.info(
            `Created product: ${newProduct.name} (id: ${newProduct.id}).`
        );
        res.sendApi(newProduct, "Product created successfully.");
    } catch (err) {
        logger.error(`Failed to create product. \n${err}`);
        res.sendErr(err, "Failed to create product.");
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productData = UpdateProductDataSchema.parse(req.body.data);
        const {
            id,
            name,
            description,
            price,
            rating,
            discountPrice,
            images,
            categoryNames,
        } = productData;
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                rating,
                discountPrice,
                images,
                categories: {
                    connect: categoryNames.map((name) => ({ name })),
                },
            },
        });
        logger.info(
            `Updated product: ${updatedProduct.name} (id: ${updatedProduct.id}).`
        );
        res.sendApi(updatedProduct, "Product updated successfully.");
    } catch (err) {
        logger.error(`Failed to update product. \n${err}`);
        res.sendErr(err, "Failed to update product.");
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.sendErr(
                { message: "Product ID is required" },
                "Product ID is required."
            );
        }
        const deletedProduct = await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        logger.info(
            `Deleted product: ${deletedProduct.name} (id: ${deletedProduct.id}).`
        );
        res.sendApi(deletedProduct, "Product deleted successfully.");
    } catch (err) {
        logger.error(`Failed to delete product. \n${err}`);
        res.sendErr(err, "Failed to delete product.");
    }
};

export const getProductsByPage = async (req: Request, res: Response) => {
    try {
        const page = Number(req.params["page"]);
        const limit = Number(req.params["limit"]);
        const products = await prisma.product.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                id: "asc",
            },
            include: {
                categories: true,
            },
        });
        logger.info(
            `Successfully got ${products.length} products. page ${page} limit ${limit}`
        );
        res.sendApi(products, "Successfully got products by page");
    } catch (err) {
        logger.error(`Failed to get products by page. \n${err}`);
        res.sendErr(err, "Failed to get products by page.");
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();
        logger.info(`Successfully got all ${categories.length} categories.`);
        res.sendApi(categories, "Successfully got all categories.");
    } catch (err) {
        logger.error(`Failed to get all categories. \n${err}`);
        res.sendErr(err, "Failed to get all categories.");
    }
};