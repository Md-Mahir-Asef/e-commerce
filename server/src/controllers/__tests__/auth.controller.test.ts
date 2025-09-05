import request from 'supertest';
import {describe, it, expect} from "@jest/globals";
import app from '../../app';

describe("Endpoint: /auth/register", () => {
    let cookie;
    it("Should return a status code of 200, a JWT cookie adn a response with token and user details", async () => {
        const response = await request(app).post("/api/v1/auth/register").send({user_name: "tesUser", email: "test@test.test", password: "test@123"});
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("data"); 
        expect(response.header["token"]).toBeDefined();
        cookie = response.header["token"][0];
        
    })
});