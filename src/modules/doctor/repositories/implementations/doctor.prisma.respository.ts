import { prismaClient } from "../../../../infra/database/prisma.config";
import { Doctor } from "../../entities/doctor.entity";
import { DoctorMapper } from "../../mapper/doctor.map";
import { IDoctorRepository } from "../doctor.respository";

export class doctorPrismaRespository implements IDoctorRepository {
    async save(data: Doctor): Promise<Doctor> {
        const doctor = await prismaClient.doctor.create({
            data: {
                crm: data.crm,
                email: data.email,
                speciality_id: data.specialityId,
                user_id: data.userId,
            },
        });
        return DoctorMapper.PrismaToEntityDoctor(doctor);
    }
    async findByCRM(crm: string): Promise<Doctor | null> {
        const doctor = await prismaClient.doctor.findUnique({
            where: {
                crm,
            },
        });
        if (doctor) return DoctorMapper.PrismaToEntityDoctor(doctor);
        return null;
    }
}
