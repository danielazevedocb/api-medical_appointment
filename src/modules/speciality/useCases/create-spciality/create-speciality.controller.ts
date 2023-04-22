import { Request, Response } from "express";
import { ISpecialityRespository } from "../../repositories/speciality.repository";
import { CreateSpecialyUseCase } from "./create-speciality.usecase";

export class CreateSpecialityController {
    constructor(private specilityRespository: ISpecialityRespository) {}

    async handle(request: Request, response: Response) {
        try {
            const useCase = new CreateSpecialyUseCase(
                this.specilityRespository
            );

            const result = await useCase.execute(request.body);

            return response.json(result);
        } catch (err: any) {
            return response.status(err.statusCode || 400).json({
                error: err.message,
            });
        }
    }
}
