import { OpenAPIV3 } from "openapi-types";

export const swaggerSpec: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
      title: "166-karqo",
      version: "1.0.0",
      description: "API documentation description",
    },
    paths: {
      "/api/v1/auth/login": {
        post: {
          summary: "İstifadəçi login olur",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "user@example.com" },
                    password: { type: "string", example: "secret123" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Uğurlu giriş" },
            401: { description: "Yanlış məlumat" },
          },
        },
      },
      "/api/v1/auth/register": {
        post: {
          summary: "Yeni istifadəçi qeydiyyatı",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    surname: { type: "string" },
                    pin: { type: "string" },
                    serial_number: { type: "string" },
                    address: { type: "string" },
                    tax_id: { type: "string" },
                    legal_entity: { type: "string" },
                    station: { type: "string" },
                    birthdate: { type: "string", format: 'date' },
                    sex: { type: "string" },
                    nationality: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    phone: { type: "string" },
                    confirm_password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Qeydiyyat tamamlandı" },
            400: { description: "Yanlış və ya əskik məlumat" },
          },
        },
      },
    },
    components: {
      securitySchemes:{
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }
      }
    }
  };