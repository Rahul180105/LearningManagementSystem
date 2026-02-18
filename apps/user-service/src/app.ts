import express from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';

const app:any = express();

app.use(express.json());
app.use('/api',routes);
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

export default app;