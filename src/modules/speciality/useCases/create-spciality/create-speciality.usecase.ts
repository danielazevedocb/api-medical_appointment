import { CustomError } from "../../../../errors/custom.error"
import { Speciality } from "../../entities/speciality.entity"
import { ISpecialityRespository } from "../../repositories/speciality.repository"

type ISpecialityRequest = {
    name: string,
    description: string
}


export class CreateSpecialyUseCase {

    constructor(private specialityRepository: ISpecialityRespository){}

    async execute(data: ISpecialityRequest){
        const speciality = new Speciality(data)

        const existSpeciality = await this.specialityRepository.findByName(data.name)

        if(existSpeciality) {
            throw new CustomError('Speciality already exists!')
        }

        const specialityCreated = await this.specialityRepository.save(speciality)

        return specialityCreated
    }
}