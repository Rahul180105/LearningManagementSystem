import request from "supertest"
import app from "../src/app"
import { Course } from "@lms/shared-db"

jest.mock("@lms/shared-db", () => ({
  Course: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn()
  },
  sequelize: {
    authenticate: jest.fn()
  }
}))

describe("Course Controller", () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("POST /api/courses should create course", async () => {
    const mockCourse = {
      id: 1,
      code: "REACT-101",
      title: "React Basics"
    }

    ;(Course.create as jest.Mock).mockResolvedValue(mockCourse)

    const response = await request(app)
      .post("/api/courses")
      .send({
        code: "REACT-101",
        title: "React Basics",
        difficulty: "beginner",
        estimatedHours: 40
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(mockCourse)
  })

  it("GET /api/courses should return courses", async () => {
    const mockCourses = [{ id: 1 }]

    ;(Course.findAll as jest.Mock).mockResolvedValue(mockCourses)

    const response = await request(app).get("/api/courses")

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockCourses)
  })

})