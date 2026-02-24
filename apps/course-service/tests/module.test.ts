import { sequelize, Course, Module } from "@lms/shared-db"
import {
  createModuleService,
  getModuleByCourseService,
  updateModuleService,
  deleteModuleService,
} from "../src/services/module.service"

describe("Module Service", () => {
  let course: Course

  beforeAll(async () => {
    await sequelize.sync({ force: true })

    course = await Course.create({
      code: "TEST-101",
      title: "Test Course",
      difficulty:"intermediate",
      status: "draft",
    })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should create a module", async () => {
    const module = await createModuleService(course.id, {
      title: "Intro Module",
      sequenceOrder: 1,
      moduleType: "online",
      contentType: "video",
      contentUrl: "https://example.com",
      estimatedMinutes: 30,
    })

    expect(module).not.toBeNull()
    expect(module?.title).toBe("Intro Module")
  })

  it("should return null if course not found", async () => {
    const module = await createModuleService(9999, {
      title: "Invalid Module",
      sequenceOrder: 1,
      moduleType: "online",
    })

    expect(module).toBeNull()
  })

  it("should fetch modules by course", async () => {
    const modules = await getModuleByCourseService(course.id)

    expect(modules.length).toBeGreaterThan(0)
    expect(modules[0]!.courseId).toBe(course.id)
  })

  it("should update module", async () => {
    const module = await Module.findOne({
      where: { courseId: course.id },
    })

    const updated = await updateModuleService(module!.id, {
      title: "Updated Title",
    })

    expect(updated?.title).toBe("Updated Title")
  })

  it("should return null if update module not found", async () => {
    const updated = await updateModuleService(9999, {
      title: "Does Not Exist",
    })

    expect(updated).toBeNull()
  })

  it("should delete module", async () => {
    const module = await Module.findOne({
      where: { courseId: course.id },
    })

    const deleted = await deleteModuleService(module!.id)

    expect(deleted).toBe(true)
  })

  it("should return null if delete module not found", async () => {
    const deleted = await deleteModuleService(9999)

    expect(deleted).toBeNull()
  })
})