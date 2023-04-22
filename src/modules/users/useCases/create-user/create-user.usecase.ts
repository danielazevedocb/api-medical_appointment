import { CustomError } from "../../../../errors/custom.error";
import { ParameterRequiredError } from "../../../../errors/parameter-required.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { User } from "../../entities/user.entity";
import { IUserRespository } from "../../repositories/user.repository";

type UserRequest = {
    name: string;
    username: string;
    password: string;
};

export class CreateUserUseCase {
    constructor(
        private userRespository: IUserRespository,
        private passwordCrypto: IPasswordCrypto
    ) {}

    async execute(data: UserRequest) {
        const user = User.create(data);

        if (!data.username || !data.password) {
            throw new ParameterRequiredError(
                "Username/password is required.",
                422
            );
        }

        const existUser = await this.userRespository.findByUsername(
            data.username
        );

        if (existUser) {
            throw new CustomError(
                "Username already exists",
                400,
                "USER_EXISTS_ERROR"
            );
        }

        const passwordHasdred = await this.passwordCrypto.hash(data.password);
        user.password = passwordHasdred;

        const userCreated = await this.userRespository.save(user);

        return userCreated;
    }
}
