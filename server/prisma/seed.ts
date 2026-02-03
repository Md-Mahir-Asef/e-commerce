import prisma from "../src/utils/prisma";
import { faker } from "@faker-js/faker";
import { hasher } from "../src/utils/hasher";
import logger from "../src/utils/logger";

const NumOfUsers = 100;
const NumOfProds = 100;
const categories = [
    "Electronics",
    "Computers",
    "Mobile Phones",
    "Home Appliances",
    "Furniture",
    "Clothing",
    "Footwear",
    "Books",
    "Sports",
    "Toys & Games",
    "Beauty & Personal Care",
    "Health",
    "Automotive",
    "Gadgets",
    "Stationery",
];

const userSeed = async () => {
    try {
        logger.info("Seeding users to the Database...");
        await prisma.user.deleteMany();
        await prisma.user.create({
            data: {
                user_name: "Md. Mahir Asef",
                email: "mahir@asef.ecom",
                password: hasher("MahirCan'tPass320"),
                role: "admin",
            },
        });
        await prisma.user.create({
            data: {
                user_name: "admin",
                email: "admin@admin.ecom",
                password: hasher("pass@123"),
                role: "visitor",
            },
        });
        for (let i = 0; i < NumOfUsers; i++) {
            await prisma.user.create({
                data: {
                    user_name: faker.person.fullName(),
                    email: `${faker.person.prefix()}${
                        i ** 2
                    }@${faker.internet.domainName()}`,
                    password: faker.internet.password(),
                },
            });
        }
        logger.info("User Seeding Finished.");
    } catch (err) {
        logger.error(`Can't seed users due to Error: \n${err}`);
        throw err;
    }
};

const createCategories = async () => {
    try {
        logger.info("Seeding categories to the Database...");
        await prisma.category.deleteMany();
        for (const category of categories) {
            await prisma.category.create({
                data: {
                    name: category,
                },
            });
        }
        logger.info("Category Seeding Finished.");
    } catch (err) {
        logger.error(`Can't seed categories due to Error: \n${err}`);
        throw err;
    }
};

const productSeed = async () => {
    try {
        logger.info("Seeding products to the Database...");
        await prisma.product.deleteMany();
        for (let i = 0; i < NumOfProds; i++) {
            await prisma.product.create({
                data: {
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: Number(faker.number.int({ min: 100, max: 10000 })),
                    rating: Number(
                        faker.number.float({
                            min: 0,
                            max: 5,
                            fractionDigits: 1,
                        })
                    ),
                    images: [],
                    categories: {
                        connect: [
                            {
                                name: categories[
                                    faker.number.int({
                                        min: 0,
                                        max: categories.length - 1,
                                    })
                                ],
                            },
                            {
                                name: categories[
                                    faker.number.int({
                                        min: 0,
                                        max: categories.length - 1,
                                    })
                                ],
                            },
                            {
                                name: categories[
                                    faker.number.int({
                                        min: 0,
                                        max: categories.length - 1,
                                    })
                                ],
                            },
                        ],
                    },
                },
            });
        }
        logger.info("Product Seeding Finished.");
    } catch (err) {
        logger.error(`Can't seed products due to Error: \n${err}`);
        throw err;
    }
};

const main = async () => {
    await userSeed();
    await createCategories();
    await productSeed();
    await prisma.$disconnect();
};

main().catch((err) => {
    logger.error(err);
    process.exit(1);
});
