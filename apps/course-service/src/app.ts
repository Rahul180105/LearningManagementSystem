import express from "express";
import cors from "cors";
import courseRoutes from './routes/course.routes.ts';
import * as dotenv from 'dotenv';
import moduleRoutes from "./routes/module.routes.ts";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./config/swagger.config.ts";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health',(_req,res)=>{
    res.status(200).json({status:"ok",service:"course-service"});
})
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use("/api/courses",courseRoutes);
app.use("/api",moduleRoutes);

export default app;

