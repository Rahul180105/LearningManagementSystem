import app from "./app"
import { sequelize } from "@lms/shared-db"

const PORT = process.env.PORT || 3004

const startServer = async () => {
  try {
    await sequelize.sync()

    app.listen(PORT, () => {
      console.log(`Enrollment service running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server", error)
    process.exit(1)
  }
}

startServer()