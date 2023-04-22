import { AuthenticateUserController } from "./authenticate-user.controller";
import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { UserPrismaRespository } from "../../repositories/implementations/user.prisma.repository";
import { JWTToken } from "../../../../infra/shared/token/jwt.token";

const userPrimaRespository = new UserPrismaRespository();
const passwordBcrypt = new PasswordBcrypt();
const token = new JWTToken();

const authenticateUserController = new AuthenticateUserController(
    userPrimaRespository,
    passwordBcrypt,
    token
);

export { authenticateUserController };
