import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "../../app";

describe("Endpoint: /auth/register", () => {
    it("should return a status code of 200, a JWT cookie and a response with token and user details", async () => {
        const response = await request(app)
            .post("/api/v1/auth/register")
            .send({
                data: {
                    user_name: "tesUser",
                    email: "test@test.test",
                    password: "test@123",
                },
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("token");
        expect(response.body.data).toHaveProperty("user");
        expect(response.body.data.user).toHaveProperty("user_name", "tesUser");
        expect(response.body.data.user).toHaveProperty(
            "email",
            "test@test.test"
        );
        expect(response.body.data.user).toHaveProperty("user_id");
        expect(response.body.data.user).toHaveProperty("role", "user");
        expect(response.headers["set-cookie"]).toBeDefined();
    });
});

describe("Endpoint: /auth/me", () => {
    let cookie: string;
    it("should return the user info in the token payload for authenticated user", async () => {
        const regResponse = await request(app)
            .post("/api/v1/auth/register")
            .send({
                data: {
                    user_name: "tesUser",
                    email: "test@test.test",
                    password: "test@123",
                },
            });
        expect(regResponse.headers["set-cookie"]).toBeDefined();
        cookie = regResponse.headers["set-cookie"][0];
        const getTokenResponse = await request(app)
            .get("/api/v1/auth/me")
            .set("Cookie", cookie);
        expect(getTokenResponse.statusCode).toBe(200);
        expect(getTokenResponse.body).toHaveProperty("success", true);
        expect(getTokenResponse.body).toHaveProperty("data");
        expect(getTokenResponse.body).toHaveProperty("message");
        expect(getTokenResponse.body.data).toHaveProperty("user_id");
        expect(getTokenResponse.body.data).toHaveProperty(
            "user_name",
            "tesUser"
        );
    });

    it("should return status code 401 and an error for unauthenticated user", async () => {
        const response = await request(app).get("/api/v1/auth/me");
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("success", false);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toHaveProperty("authenticated", false);
        expect(response.body.error).toHaveProperty("err");
    });
});
