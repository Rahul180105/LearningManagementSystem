import express from "express";
import cors from "cors";
import courseRoutes from './routes/course.routes.ts';
import {errorHandler} from './middlewares/error.middleware.ts';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health',(_req,res)=>{
    res.status(200).json({status:"ok",service:"course-service"});
})
app.use("/api/courses",courseRoutes);

export default app;

