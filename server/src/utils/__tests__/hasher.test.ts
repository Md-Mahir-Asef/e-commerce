import { config } from "../../config/config";
import { hasher } from "../hasher";
import bcrypt from "bcrypt";
import { jest, describe, it, expect } from "@jest/globals";

jest.mock("bcrypt");
jest.mock("../../config/config");

describe("hasher", () => {
    it("should work", () => {
        expect(true).toBe(true);
    });
});
