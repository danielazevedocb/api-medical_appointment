import { Router } from "express";
import { createSpecialityController } from "../modules/speciality/useCases/create-spciality";
import { ensureAuthenticate } from "../infra/http/middleware/ensure-authenticate.middleware";

const specialityRouter = Router();

specialityRouter.post("/specialities",
 ensureAuthenticate,
 async (request, response) =>{
    await createSpecialityController.handle(request, response)
})

export { specialityRouter };