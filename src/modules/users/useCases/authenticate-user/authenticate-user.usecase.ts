import { CustomError } from "../../../../errors/custom.error"
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto"
import { IUserRespositiry } from "../../repositories/user.repository"


type AuthenticateRequest = {
    username: string,
    password: string
}

export class AuthenticateUserUseCase {
    /**
     * username
     * password
     * validar se o ususario existe no sistema
     * validar se a senha está correta
     */

    constructor(private userRepository: IUserRespositiry, private passwordCrypto: IPasswordCrypto){}

    async execute({username, password}: AuthenticateRequest){

        if(!username || !password) {
            throw new  CustomError('User/password incorrent', 401)
        }

    const user = await  this.userRepository.findByUsername(username);

    if(!user) {
        throw new  CustomError('User/password incorrent', 401)
    }
    
    const comparePasswordEquals = await this.passwordCrypto.compare(password, user.password)

    if(!comparePasswordEquals){
        throw new  CustomError('User/password incorrent', 401)
    }

    return user
    
    }
}