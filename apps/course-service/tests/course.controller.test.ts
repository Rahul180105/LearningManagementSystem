import request from "supertest"
import app from "../src/app"
import { Course } from "@lms/shared-db"
import { title } from "node:process"

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
  it("should return 400 for invalid create data",async ()=>{
    const response = (await request(app).post("/api/courses"))
    expect(response.status).toBe(400);
  })
  it("should return 404 if updating not-existent course",async()=>{
    ;(Course.findByPk as jest.Mock).mockResolvedValue(null)

    const response=await request(app).put("/api/courses/999").send({title:"updated"})
    expect(response.status).toBe(404)
  })
  it("should update existing course",async()=>{
    const mockCourse={ update:jest.fn().mockResolvedValue(true)}
    ;(Course.findByPk as jest.Mock).mockResolvedValue(mockCourse)

    const response = await request(app).put("/api/courses/1").send({title:"updated"})
    expect(response.status).toBe(200)
  })

})