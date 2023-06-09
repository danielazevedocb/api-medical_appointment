import "dotenv/config";
import express from "express";
import { userRouter } from "./routes/user.routes";
import { specialityRouter } from "./routes/specialilty.routes";

import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(userRouter);
app.use(specialityRouter);

app.listen(3000, () => console.log("Server is runnning on PORT 3000"));
