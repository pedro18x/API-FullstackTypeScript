"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    published: zod_1.z.boolean().optional(),
    authorId: zod_1.z.number().int().positive(),
});
exports.updatePostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    content: zod_1.z.string().min(1).optional(),
    published: zod_1.z.boolean().optional(),
});
