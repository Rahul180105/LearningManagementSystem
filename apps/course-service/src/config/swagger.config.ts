import swaggerJsdoc from "swagger-jsdoc"
import type { Options } from "swagger-jsdoc"

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LMS Course Service API",
      version: "1.0.0",
      description: "Course & Module Management APIs",
    },
    servers: [
      {
        url: "http://localhost:3003",
      },
    ],
    components: {
      schemas: {
        CourseResponse: {
      type: "object",
      properties: {
        id: { type: "number" },
        code: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        status: {
          type: "string",
          enum: ["draft", "published", "archived"]
        },
        difficulty: {
          type: "string",
          enum: ["beginner", "intermediate", "advanced"]
        },
        estimatedHours: { type: "number" }
      }
    },

    CreateCourseRequest: {
      type: "object",
      required: ["code", "title", "difficulty", "estimatedHours"],
      properties: {
        code: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        status: {
          type: "string",
          enum: ["draft", "published", "archived"]
        },
        difficulty: {
          type: "string",
          enum: ["beginner", "intermediate", "advanced"]
        },
        estimatedHours: { type: "number" }
      }
    },

    UpdateCourseRequest: {
      type: "object",
      properties: {
        code: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        status: {
          type: "string",
          enum: ["draft", "published", "archived"]
        },
        difficulty: {
          type: "string",
          enum: ["beginner", "intermediate", "advanced"]
        },
        estimatedHours: { type: "number" }
      }
    },

        ModuleResponse: {
  type: "object",
  properties: {
    id: { type: "number" },
    courseId: { type: "number" },
    title: { type: "string" },
    description: { type: "string" },
    moduleType: {
      type: "string",
      enum: ["online", "offline"]
    },
    contentType: {
      type: "string",
      enum: ["video", "document", "link"]
    },
    contentUrl: { type: "string" },
    sequenceOrder: { type: "number" },
    estimatedMinutes: { type: "number" },
    isMandatory: { type: "boolean" },
    sessionDate: { type: "string" },
    location: { type: "string" }
  }
},

CreateModuleRequest: {
  type: "object",
  required: ["title", "moduleType", "sequenceOrder"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    moduleType: {
      type: "string",
      enum: ["online", "offline"]
    },
    contentType: {
      type: "string",
      enum: ["video", "document", "link"]
    },
    contentUrl: { type: "string" },
    sequenceOrder: { type: "number" },
    estimatedMinutes: { type: "number" },
    isMandatory: { type: "boolean" },
    sessionDate: { type: "string" },
    location: { type: "string" }
  }
},

UpdateModuleRequest: {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    moduleType: {
      type: "string",
      enum: ["online", "offline"]
    },
    contentType: {
      type: "string",
      enum: ["video", "document", "link"]
    },
    contentUrl: { type: "string" },
    sequenceOrder: { type: "number" },
    estimatedMinutes: { type: "number" },
    isMandatory: { type: "boolean" },
    sessionDate: { type: "string" },
    location: { type: "string" }
  }
},
      },
    },
  },
  apis: ["./src/routes/*.ts"],
}

export const swaggerSpec = swaggerJsdoc(options)

