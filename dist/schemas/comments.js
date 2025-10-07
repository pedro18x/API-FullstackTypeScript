"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentSchema = exports.createCommentSchema = void 0;
const zod_1 = require("zod");
exports.createCommentSchema = zod_1.z.object({
    content: zod_1.z.string().min(1),
    postId: zod_1.z.number().int().positive(),
    authorId: zod_1.z.number().int().positive(),
});
exports.updateCommentSchema = zod_1.z.object({
    content: zod_1.z.string().min(1).optional(),
});
