import { AuthenticateUserController } from "./authenticate-user.controller";
import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { UserPrismaRespository } from "../../repositories/implementations/user.prisma.repository";


const userPrimaRespository = new UserPrismaRespository();
const passwordBcrypt = new PasswordBcrypt()

const authenticateUserController = new AuthenticateUserController(userPrimaRespository, passwordBcrypt)

export { authenticateUserController }