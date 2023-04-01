import bcrypt from "bcryptjs";

import { IPasswordCrypto } from "./password.crypto";

export class PasswordCrypt implements IPasswordCrypto{

    hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

}