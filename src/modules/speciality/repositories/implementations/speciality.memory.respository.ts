import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRespository } from "../speciality.repository";

export class SpecialityMemoryRepository implements ISpecialityRespository {
    items: Speciality[] = [];

    async save(data: Speciality): Promise<Speciality> {
        this.items.push(data);
        return data;
    }
    async findByName(name: string): Promise<Speciality | null> {
        return (
            this.items.find((Speciality) => Speciality.name === name) || null
        );
    }
    async findById(id: string): Promise<Speciality | null> {
        return this.items.find((Speciality) => Speciality.id === id) || null;
    }
}
