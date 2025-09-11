import prisma from "../src/utils/prisma";
import { faker } from "@faker-js/faker";
import { hasher } from "../src/utils/hasher";
import logger from "../src/utils/logger";

const NumOfUsers = 10;

const seed = async () => {
    try {
        logger.info("Seeding the Database...");
        await prisma.user.deleteMany();
        await prisma.user.create({
            data: {
                user_name: "Md. Mahir Asef",
                email: "mahir@asef.ecom",
                password: hasher("MahirCan'tPass420"),
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
        logger.info("Seeding Finished.");
        await prisma.$disconnect();
    } catch (err) {
        logger.error(`Can't seed due to Error: \n${err}`);
    }
};

seed();
