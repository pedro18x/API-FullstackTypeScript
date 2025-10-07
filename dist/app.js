"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const users_1 = require("./routes/users");
const posts_1 = require("./routes/posts");
const comments_1 = require("./routes/comments");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Express + Prisma API',
            version: '1.0.0',
            description: 'API com Users, Posts e Comments. Validações Zod, Prisma e Swagger.',
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
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/users', users_1.router);
app.use('/posts', posts_1.router);
app.use('/comments', comments_1.router);
exports.default = app;
