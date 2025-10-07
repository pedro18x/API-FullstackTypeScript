import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { router as usersRouter } from './routes/users';
import { router as postsRouter } from './routes/posts';
import { router as commentsRouter } from './routes/comments';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Express + Prisma API',
      version: '1.0.0',
      description:
        'API com Users, Posts e Comments. Validações Zod, Prisma e Swagger.',
    },
    servers: [
      {
        url: 'http://localhost:' + (process.env.PORT || 3000),
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            email: { type: 'string' },
            name: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Post: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            content: { type: 'string' },
            published: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            authorId: { type: 'integer' },
          },
        },
        Comment: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            content: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            postId: { type: 'integer' },
            authorId: { type: 'integer' },
          },
        },
      },
    },
  },
  apis: ['src/routes/**/*.ts'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

export default app;
