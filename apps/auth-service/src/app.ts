import express from 'express';
import dotenv from 'dotenv';
import { swaggerSpec } from './config/swagger.config';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app =express();
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.get('/health',(_req,res)=>{
    res.status(200).json({status:'ok'});
});

export default app;