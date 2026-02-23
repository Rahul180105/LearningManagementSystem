import request from "supertest";
import app from "../src/app";

describe("Course Service", () => {
  it("GET /health should return service status", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /api/courses should return empty list", async () => {
    const res = await request(app).get("/api/courses");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("courses");
    expect(res.body).toHaveProperty("total");
  });
});