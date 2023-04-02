import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { logger } from "../../../../utils/logger";
import { IUserRespository } from "../../repositories/user.repository";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {

  constructor(private userRespository: IUserRespository, private passwordCrypto: IPasswordCrypto){

  }

  async handle(request: Request, response: Response){
    logger.info("Usuario sendo criado!")
    try {
      const data = request.body

    const useCase = new CreateUserUseCase(this.userRespository, this.passwordCrypto)    
    const result = await useCase.execute(data)

    return response.json(result)
    }catch(err: any) {
      logger.error(err.stack)
      return response.status(err.statusCode).json({
        error: err.message,
      })
    }

  } 
} 