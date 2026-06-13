import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShopSphere API',
      version: '1.0.0',
      description: 'REST API για το e-shop project'
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            price: { type: 'number' },
            category: { type: 'string' },
            description: { type: 'string' },
            stock: { type: 'number' }
          }
        },
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' }
          }
        }
      }
    },
    paths: {
      '/api/auth/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RegisterInput' }
              }
            }
          },
          responses: {
            201: { description: 'User registered successfully' },
            409: { description: 'Email already in use' }
          }
        }
      },
      '/api/auth/login': {
        post: {
          summary: 'Login and get a JWT token',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginInput' }
              }
            }
          },
          responses: {
            200: { description: 'Returns JWT token' },
            401: { description: 'Invalid credentials' }
          }
        }
      },
      '/api/auth/me': {
        get: {
          summary: 'Return current user',
          tags: ['Auth'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Current user' },
            401: { description: 'Unauthorized' }
          }
        }
      },
      '/api/products': {
        get: {
          summary: 'Get all products',
          tags: ['Products'],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 12 } },
            { name: 'category', in: 'query', schema: { type: 'string' } },
            { name: 'minPrice', in: 'query', schema: { type: 'number' } },
            { name: 'maxPrice', in: 'query', schema: { type: 'number' } },
            { name: 'sort', in: 'query', schema: { type: 'string' }, description: 'π.χ. price (αύξουσα) ή -price (φθίνουσα)' }
          ],
          responses: {
            200: { description: 'Paginated list of products: { products, total, page, pages }' }
          }
        },
        post: {
          summary: 'Create a new product',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' }
              }
            }
          },
          responses: {
            201: { description: 'Product created' },
            401: { description: 'Unauthorized' }
          }
        }
      },
      '/api/products/{id}': {
        get: {
          summary: 'Get product by ID',
          tags: ['Products'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Product found' },
            404: { description: 'Product not found' }
          }
        },
        put: {
          summary: 'Update product',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' }
              }
            }
          },
          responses: {
            200: { description: 'Product updated' },
            401: { description: 'Unauthorized' }
          }
        },
        delete: {
          summary: 'Delete product',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Product deleted' },
            401: { description: 'Unauthorized' }
          }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);