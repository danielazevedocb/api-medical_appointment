import { describe, test, expect, it } from "vitest";
import { User } from "../user.entity";

describe("user entity", () => {
    it("Should be able to a new user", async () => {
        const user = await User.create({
            name: "USERM_NAME_TEST",
            password: "PASSWORD_TEST",
            username: "USERNAME",
        });

        console.log({user})

        expect(user).toBeInstanceOf(User);
        expect(user).toHaveProperty("id");
        expect(user.password).not.equal("PASSWORD_TEST");
    });
});
