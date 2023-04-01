import { Speciality } from "../entities/speciality.entity";


export interface  ISpecialityRespository{
    save(data: Speciality): Promise<Speciality>
}