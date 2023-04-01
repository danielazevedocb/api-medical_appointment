import { Router } from "express";
import { createSpecialityController } from "../modules/speciality/useCases/create-spciality";

const specialityRouter = Router();

specialityRouter.post("/speciality", async (request, response) =>{
    await createSpecialityController.handle(request, response)
})

export { specialityRouter };