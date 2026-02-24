import { Router } from "express"
import {
  createModule,
  getModuleByCourse,
  updateModule,
  deleteModule,
} from "../controllers/module.controller.ts"
import { validate } from "../middlewares/validate.middleware.ts"
import {
  createModuleSchema,
  updateModuleSchema,
} from "../validators/module.validator.ts"

const router = Router()

router.post(
  "/courses/:id/modules",
  validate(createModuleSchema),
  createModule
)

router.get(
  "/courses/:id/modules",
  getModuleByCourse
)

router.put(
  "/modules/:id",
  validate(updateModuleSchema),
  updateModule
)

router.delete("/modules/:id", deleteModule)

export default router