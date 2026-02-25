import request from "supertest"
import app from "../src/app"
import { EnrollmentStatus } from "@lms/shared-db"

describe("Enrollment API", () => {

  let enrollmentId: number

  it("should enroll user", async () => {
    const res = await request(app)
      .post("/api/enrollments")
      .send({
        userId: 1,
        courseId: 1
      })

    expect(res.status).toBe(201)
    expect(res.body.userId).toBe(1)
    expect(res.body.status).toBe(EnrollmentStatus.ENROLLED)

    enrollmentId = res.body.id
  })

  it("should prevent duplicate enrollment", async () => {
    const res = await request(app)
      .post("/api/enrollments")
      .send({
        userId: 1,
        courseId: 1
      })

    expect(res.status).toBe(400)
  })

  it("should get enrollments", async () => {
    const res = await request(app)
      .get("/api/enrollments")
      .query({ userId: 1 })

    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it("should drop enrollment", async () => {
    const res = await request(app)
      .delete(`/api/enrollments/${enrollmentId}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Enrollment dropped")
  })

  it("should return 404 for invalid drop", async () => {
    const res = await request(app)
      .delete("/api/enrollments/9999")

    expect(res.status).toBe(404)
  })

  it("should bulk enroll users", async () => {
    const res = await request(app)
      .post("/api/enrollments")
      .send({
        action: "bulk",
        userIds: [2,3],
        courseId: 1
      })

    expect(res.status).toBe(201)
  })

})