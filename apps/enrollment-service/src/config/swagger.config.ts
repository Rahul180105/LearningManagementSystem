import swaggerJsdoc from "swagger-jsdoc"

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Enrollment Service API",
      version: "1.0.0",
      description: "Handles enrollments and enrollment lifecycle"
    },
    servers: [
      {
        url: "http://localhost:3004"
      }
    ],
    components: {
      schemas: {
        Enrollment: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userId: { type: "integer" },
            courseId: { type: "integer" },
            status: {
              type: "string",
              enum: ["enrolled","in_progress","completed","dropped","overdue"]
            },
            enrolledAt: { type: "string", format: "date-time" },
            dueDate: { type: "string", format: "date" },
            completionPercentage: { type: "number" }
          }
        },
        EnrollRequest: {
          type: "object",
          required: ["userId","courseId"],
          properties: {
            userId: { type: "integer" },
            courseId: { type: "integer" },
            dueDate: { type: "string", format: "date" },
            enrollmentSource: { type: "string" }
          }
        },
        BulkEnrollRequest: {
          type: "object",
          required: ["action","userIds","courseId"],
          properties: {
            action: { type: "string", example: "bulk" },
            userIds: {
              type: "array",
              items: { type: "integer" }
            },
            courseId: { type: "integer" },
            dueDate: { type: "string", format: "date" }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"]
})