import express from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';
import cors from 'cors';

const app:any = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:['GET','PUT','POST','DELETE'],
}))

app.use(express.json());
app.use('/api',routes);
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

export default app;