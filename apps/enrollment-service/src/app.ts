import express from "express"
import enrollmentRoutes from "./routes/enrollment.routes"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger.config"

const app:any = express()

app.use(express.json())

app.use("/api", enrollmentRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app