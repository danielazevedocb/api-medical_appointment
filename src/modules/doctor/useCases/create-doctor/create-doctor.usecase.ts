import { CustomError } from "../../../../errors/custom.error";
import { ISpecialityRespository } from "../../../speciality/repositories/speciality.repository";
import { User } from "../../../users/entities/user.entity";
import { IUserRespository } from "../../../users/repositories/user.repository";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../../repositories/doctor.respository";

export type CreateDoctorRequest = {
    username: string;
    name: string;
    password: string;
    email: string;
    crm: string;
    specialityID: string;
};

export class CreateDoctorUseCase {
    constructor(
        private userRespository: IUserRespository,
        private doctorRepository: IDoctorRepository,
        private specialityRespository: ISpecialityRespository
    ) {}

    async execute(data: CreateDoctorRequest) {
        const user = await User.create({
            name: data.name,
            password: data.password,
            username: data.username,
        });

        const speciality = await this.specialityRespository.findById(
            data.specialityID
        );

        if (!speciality) {
            throw new CustomError("Speciality does not exists!", 400);
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

        const userCreated = await this.userRespository.save(user);

        const doctor = Doctor.create({
            crm: data.crm,
            email: data.email,
            specialityId: data.specialityID,
            userId: userCreated.id,
        });

        const crmExists = await this.doctorRepository.findByCRM(data.crm);

        if (crmExists) {
            throw new CustomError("CRM already exists", 400);
        }

        const doctorCreated = await this.doctorRepository.save(doctor);

        return doctorCreated;
    }
}
