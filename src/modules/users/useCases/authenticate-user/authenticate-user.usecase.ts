import { CustomError } from "../../../../errors/custom.error"
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto"
import { IToken } from "../../../../infra/shared/token/token"
import { IUserRespository } from "../../repositories/user.repository"


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

    constructor(
        private userRepository: IUserRespository,
        private passwordCrypto: IPasswordCrypto,
        private token : IToken
        ){}

    async execute({username, password}: AuthenticateRequest){

        if(!username || !password) {
            throw new  CustomError('Username/password incorrent', 401)
        }

    const user = await  this.userRepository.findByUsername(username);

    
    if(!user) {
        throw new  CustomError('Username/password incorrent', 401)
    }
    
    const comparePasswordEquals = await this.passwordCrypto.compare(password, user.password)

    if(!comparePasswordEquals){
        throw new  CustomError('Username/password incorrent', 401)
    }

    const tokenGerated = this.token.create(user)


    return tokenGerated
    
    }
}