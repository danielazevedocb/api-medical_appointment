import { PasswordCrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { UserPrismaRespository } from "../../repositories/implementations/user.prisma.repository";
import { CreateUserController } from "./create-user.controller";


const userPrimaRespository = new UserPrismaRespository();
const passwordBcrypt = new PasswordCrypt()
const createUserController = new CreateUserController(
    userPrimaRespository,
    passwordBcrypt
    )

export { createUserController }