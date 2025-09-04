import { hasher } from "../hasher";
import bcrypt from "bcrypt";
import { describe, it, expect } from "@jest/globals";

describe("hasher", () => {
    it("returns a hashed string", () => {
        const plain = "mypassword";
        const hash = hasher(plain);

        expect(typeof hash).toBe("string");
        expect(hash).not.toBe(plain); // shouldn’t equal the input
    });

    it("produces a hash that bcrypt can verify", () => {
        const plain = "mypassword";
        const hash = hasher(plain);

        const matches = bcrypt.compareSync(plain, hash);
        expect(matches).toBe(true);
    });

    it("throws if data is not a string", () => {
        // @ts-expect-error testing invalid input
        expect(() => hasher(null)).toThrow();
    });
});
