import * as dotenv from "dotenv"


if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" })
} else {
  dotenv.config()
}

import app from "./app"
import { sequelize } from "@lms/shared-db"

const PORT = process.env.PORT || 3003

async function start() {
  try {
    await sequelize.authenticate()
    console.log("Database connected")

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true })
      console.log("Database synced")
    }
    app.listen(PORT, () => {
      console.log(` Course Service running on port ${PORT}`)
    })

  } catch (error) {
    console.error("Startup error:", error)
    process.exit(1)
  }
}

start()