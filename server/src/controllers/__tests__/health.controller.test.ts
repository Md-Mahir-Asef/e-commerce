import request from "supertest";
import app from "../../app";
import { describe, it, expect } from "@jest/globals";

describe("Endpoint: /health", () => {
    it("should return 200 and success to be true", async () => {
        const response = await request(app).get("/api/v1/health");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
    });
});
