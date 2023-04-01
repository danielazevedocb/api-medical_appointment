import 'dotenv/config'
import express from "express";
import { userRouter } from "./routes/user.routes";
import { specialityRouter } from './routes/specialilty.routes';

const app = express();

app.use(express.json())

app.use(userRouter)
app.use(specialityRouter)

app.listen(3000, () => console.log('Server is runnning on PORT 3000'))