import { test, describe, expect } from "vitest";
import { randomUUID } from "crypto";
import {
    CreateDoctorRequest,
    CreateDoctorUseCase,
} from "../create-doctor.usecase";
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository";
import { DoctorMemoryRepository } from "../../../repositories/implementations/doctor-memory.respository";

describe("Create Doctor Use Case", () => {
    test("Should be able to create a new doctor", async () => {
        const doctorMock: CreateDoctorRequest = {
            username: "username_test",
            name: "name_test",
            password: "password_test",
            email: "email@email.com.br",
            crm: "123456",
            specialityID: randomUUID(),
        };

        const userRespository = new UserMemoryRepository();
        const doctorRepository = new DoctorMemoryRepository();

        const createDoctorUseCase = new CreateDoctorUseCase(
            userRespository,
            doctorRepository
        );
        const doctorCreated = await createDoctorUseCase.execute(doctorMock);

        expect(doctorCreated).toHaveProperty("id");
    });
});
