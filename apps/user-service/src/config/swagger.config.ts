import swaggerJsdoc from 'swagger-jsdoc';
import type { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LMS User Service API',
      version: '1.0.0',
      description: 'User Management APIs'
    },
    servers: [
      {
        url: 'http://localhost:3002/api'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        UpdateUserRequest: {
          type: 'object',
          properties: {
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            department: { type: 'string' },
            status: { type: 'string', enum: ['active', 'inactive'] }
          }
        },
        AssignRoleRequest: {
          type: 'object',
          required: ['roleId'],
          properties: {
            roleId: { type: 'number' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);