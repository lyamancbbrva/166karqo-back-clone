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
      "/api/v1/package/create": {
        post: {
          summary: "Package yaratmaq",
          tags: ["Package"],
          security: [
            {
              bearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    product_name: {type: "string"},
                    amount: {type: "string"},
                    following_number: {type: "number"},
                    delivery: {type: "string"},
                    weight: {type: "string"},
                    store: {type: "string"},
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
      "/api/v1/package/all": {
        get: {
          summary: "Bütün packageleri gör",
          tags: ["Package"],
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            201: { description: "Qeydiyyat tamamlandı" },
            400: { description: "Yanlış və ya əskik məlumat" },
          },
        },
      },
      "/api/v1/package/change-status/{id}": {
      put: {
        summary: "Change status of package",
        tags: ["Package"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Package ID",
            schema: {
              type: "number",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Kateqoriya silindi" },
          404: { description: "Kateqoriya tapılmadı" },
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