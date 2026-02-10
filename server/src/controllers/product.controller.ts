import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";
import {
    ProductDataSchema,
    UpdateProductDataSchema,
    UpdateCategorySchema,
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
            `Created product: ${newProduct.name} (id: ${newProduct.id}).`,
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
            `Updated product: ${updatedProduct.name} (id: ${updatedProduct.id}).`,
        );
        res.sendApi(updatedProduct, "Product updated successfully.");
    } catch (err) {
        logger.error(`Failed to update product. \n${err}`);
        res.sendErr(err, "Failed to update product.");
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.sendErr(
                { message: "Product ID is required" },
                "Product ID is required.",
            );
        }
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                categories: true,
            },
        });
        if (!product) {
            return res.sendErr(
                { message: "Product not found" },
                "Product not found.",
                404,
            );
        }
        logger.info(
            `Successfully got product: ${product.name} (id: ${product.id}).`,
        );
        res.sendApi(product, "Successfully got product by ID");
    } catch (err) {
        logger.error(`Failed to get product by ID. \n ${err}`);
        res.sendErr(err, "Failed to get product by ID.");
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.sendErr(
                { message: "Product ID is required" },
                "Product ID is required.",
            );
        }
        const deletedProduct = await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        logger.info(
            `Deleted product: ${deletedProduct.name} (id: ${deletedProduct.id}).`,
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
            `Successfully got ${products.length} products. page ${page} limit ${limit}`,
        );
        res.sendApi(products, "Successfully got products by page");
    } catch (err) {
        logger.error(`Failed to get products by page. \n${err}`);
        res.sendErr(err, "Failed to get products by page.");
    }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId, page, limit } = req.params;
        const pageNum = Number(page);
        const limitNum = Number(limit);

        if (!categoryId) {
            return res.sendErr(
                { message: "Category ID is required" },
                "Category ID is required.",
            );
        }

        const products = await prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        id: parseInt(categoryId),
                    },
                },
            },
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
            orderBy: {
                id: "asc",
            },
            include: {
                categories: true,
            },
        });

        logger.info(
            `Successfully got ${products.length} products for category ${categoryId}. page ${pageNum} limit ${limitNum}`,
        );
        res.sendApi(products, "Successfully got products by category");
    } catch (err) {
        logger.error(`Failed to get products by category. \n${err}`);
        res.sendErr(err, "Failed to get products by category.");
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

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name || typeof name !== "string" || name.trim().length === 0) {
            return res.sendErr(
                null,
                "Category name is required and must be a non-empty string.",
                400,
            );
        }

        // Check if category already exists
        const existing = await prisma.category.findUnique({
            where: { name: name.trim() },
        });

        if (existing) {
            return res.sendErr(
                null,
                `Category "${name.trim()}" already exists.`,
                409,
            );
        }

        const category = await prisma.category.create({
            data: {
                name: name.trim(),
            },
        });

        logger.info(
            `Created new category: ${category.name} (id: ${category.id}).`,
        );
        res.sendApi(category, "Category created successfully.", 201);
    } catch (err) {
        logger.error(`Failed to create category. \n${err}`);
        res.sendErr(err, "Failed to create category.");
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        if (!req.params && !req.params["id"]) {
            throw new Error("No ID provided.");
        }
        const id = Number(req.params["id"]);
        const CategoryNames = UpdateCategorySchema.parse(req.body.data);
        console.log("Second");
        const { new_name } = CategoryNames;
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name: new_name,
            },
        });
        logger.info(
            `Updated category name: ${updatedCategory.name} (id: ${updatedCategory.id}).`,
        );
        res.sendApi(updatedCategory, "Product updated successfully.");
    } catch (err) {
        logger.error(`Failed to update category. \n${err}`);
        res.sendErr(err, "Failed to update category.");
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const idParam = req.params["id"];
        if (!idParam) {
            return res.sendErr(
                { message: "Category ID is required" },
                "Category ID is required.",
                400,
            );
        }
        const categoryId = parseInt(idParam, 10);
        if (Number.isNaN(categoryId)) {
            return res.sendErr(
                { message: "Invalid category ID" },
                "Invalid category ID.",
                400,
            );
        }

        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            return res.sendErr(
                { message: "Category not found" },
                "Category not found.",
                404,
            );
        }

        const productsWithCategory = await prisma.product.findMany({
            where: {
                categories: {
                    some: { id: categoryId },
                },
            },
            select: { id: true },
        });

        await prisma.$transaction([
            ...productsWithCategory.map((p) =>
                prisma.product.update({
                    where: { id: p.id },
                    data: {
                        categories: {
                            disconnect: [{ id: categoryId }],
                        },
                    },
                }),
            ),
            prisma.category.delete({
                where: { id: categoryId },
            }),
        ]);

        logger.info(
            `Deleted category: ${category.name} (id: ${categoryId}), removed from ${productsWithCategory.length} product(s).`,
        );
        res.sendApi(
            { id: categoryId, name: category.name },
            "Category deleted successfully.",
        );
    } catch (err) {
        logger.error(`Failed to delete category. \n${err}`);
        res.sendErr(err, "Failed to delete category.");
    }
};

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const {
            q: query,
            page = "1",
            limit = "10",
            sort = "newest",
        } = req.query;

        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);

        if (isNaN(pageNum) || pageNum < 1) {
            return res.sendErr(
                { message: "Invalid page number" },
                "Invalid page number.",
                400,
            );
        }

        if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
            return res.sendErr(
                { message: "Invalid limit (must be between 1 and 50)" },
                "Invalid limit.",
                400,
            );
        }

        // Build where clause for search
        const whereClause: any = {};
        if (query && typeof query === "string" && query.trim()) {
            whereClause.name = {
                contains: query.trim(),
                mode: "insensitive",
            };
        }

        // Build order clause
        let orderBy: any = { createdAt: "desc" }; // default: newest
        if (sort === "price_asc") {
            orderBy = { price: "asc" };
        } else if (sort === "price_desc") {
            orderBy = { price: "desc" };
        } else if (sort === "newest") {
            orderBy = { createdAt: "desc" };
        }

        // Get total count for pagination
        const totalItems = await prisma.product.count({
            where: whereClause,
        });

        // Get products with pagination
        const products = await prisma.product.findMany({
            where: whereClause,
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
            orderBy,
            include: {
                categories: true,
            },
        });

        const totalPages = Math.ceil(totalItems / limitNum);

        logger.info(
            `Search completed: query="${query}", page=${pageNum}, limit=${limitNum}, sort=${sort}, found=${products.length} products`,
        );

        res.sendApi(
            {
                data: products,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    totalPages,
                    totalItems,
                },
            },
            "Search completed successfully",
        );
    } catch (err) {
        logger.error(`Failed to search products. \n${err}`);
        res.sendErr(err, "Failed to search products.");
    }
};
