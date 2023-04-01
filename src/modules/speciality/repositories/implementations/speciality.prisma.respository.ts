import { prismaClient } from "../../../../infra/database/prisma.config";
import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRespository } from "../speciality.repository";

export class SpecialityPrismaRepository implements ISpecialityRespository {

    async save(data: Speciality): Promise<Speciality> {
        
        const speciality = await prismaClient.speciality.create({
            data: {
                name: data.name,
                description: data.description,
                id: data.id,
            }
        })

        return speciality
    }

}