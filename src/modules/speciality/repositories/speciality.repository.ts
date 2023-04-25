import { Speciality } from "../entities/speciality.entity";

export interface ISpecialityRespository {
    save(data: Speciality): Promise<Speciality>;
    findByName(name: string): Promise<Speciality | null>;
    findById(id: string): Promise<Speciality | null>;
}
