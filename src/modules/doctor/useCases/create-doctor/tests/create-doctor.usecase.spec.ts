import { test, describe, expect, beforeAll } from "vitest";
import { randomUUID } from "crypto";
import {
    CreateDoctorRequest,
    CreateDoctorUseCase,
} from "../create-doctor.usecase";
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository";
import { DoctorMemoryRepository } from "../../../repositories/implementations/doctor-memory.respository";
import { SpecialityMemoryRepository } from "../../../../speciality/repositories/implementations/speciality.memory.respository";
import { Speciality } from "../../../../speciality/entities/speciality.entity";
import { ISpecialityRespository } from "../../../../speciality/repositories/speciality.repository";

let specialityRespository: ISpecialityRespository;
let speciality: Speciality;

beforeAll(async () => {
    specialityRespository = new SpecialityMemoryRepository();
    speciality = Speciality.create({
        description: "DESC_TEST",
        name: "NAME_TEST",
    });

    await specialityRespository.save(speciality);
});

describe("Create Doctor Use Case", () => {
    test("Should be able to create a new doctor", async () => {
        const userRespository = new UserMemoryRepository();
        const doctorRepository = new DoctorMemoryRepository();

        const doctorMock: CreateDoctorRequest = {
            username: "username_test",
            name: "name_test",
            password: "password_test",
            email: "email@email.com.br",
            crm: "123456",
            specialityID: speciality.id,
        };

        const createDoctorUseCase = new CreateDoctorUseCase(
            userRespository,
            doctorRepository,
            specialityRespository
        );
        const doctorCreated = await createDoctorUseCase.execute(doctorMock);

        expect(doctorCreated).toHaveProperty("id");
    });
    test("Should not be able to create a new doctor with exists CRM", async () => {
        const userRespository = new UserMemoryRepository();
        const doctorRepository = new DoctorMemoryRepository();

        const doctorMock: CreateDoctorRequest = {
            username: "username_test",
            name: "name_test",
            password: "password_test",
            email: "email@email.com.br",
            crm: "123456",
            specialityID: speciality.id,
        };

        const doctorMockDuplicated: CreateDoctorRequest = {
            username: "username_duplicated",
            name: "name_duplicated",
            password: "password_duplicated",
            email: "email@email.com.br",
            crm: "123456",
            specialityID: speciality.id,
        };

        const createDoctorUseCase = new CreateDoctorUseCase(
            userRespository,
            doctorRepository,
            specialityRespository
        );
        await createDoctorUseCase.execute(doctorMock);

        expect(async () => {
            await createDoctorUseCase.execute(doctorMockDuplicated);
        }).rejects.toThrowError("CRM already exists");
    });

    test("Should not be able to create a new doctor with exists CRM length invalid", async () => {
        const doctorMock: CreateDoctorRequest = {
            username: "username_test",
            name: "name_test",
            password: "password_test",
            email: "email@email.com.br",
            crm: "12345",
            specialityID: speciality.id,
        };

        const userRespository = new UserMemoryRepository();
        const doctorRepository = new DoctorMemoryRepository();

        const createDoctorUseCase = new CreateDoctorUseCase(
            userRespository,
            doctorRepository,
            specialityRespository
        );
        expect(async () => {
            await createDoctorUseCase.execute(doctorMock);
        }).rejects.toThrowError("CRM length is incorrect!");
    });
});
