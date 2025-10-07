"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const prisma_1 = require("../prisma");
const validate_1 = require("../middlewares/validate");
const comments_1 = require("../schemas/comments");
exports.router = (0, express_1.Router)();
/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Listar comentários
 *     tags: [Comments]
 */
exports.router.get('/', async (_req, res) => {
    const comments = await prisma_1.prisma.comment.findMany();
    res.json(comments);
});
/**
 * @openapi
 * /comments/{id}:
 *   get:
 *     summary: Obter comentário por ID
 *     tags: [Comments]
 */
exports.router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const comment = await prisma_1.prisma.comment.findUnique({ where: { id } });
    if (!comment)
        return res.status(404).json({ message: 'Not found' });
    res.json(comment);
});
/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Criar comentário
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content, postId, authorId]
 *             properties:
 *               content:
 *                 type: string
 *               postId:
 *                 type: integer
 *               authorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentário criado
 */
exports.router.post('/', (0, validate_1.validate)(comments_1.createCommentSchema), async (req, res) => {
    const comment = await prisma_1.prisma.comment.create({ data: req.body });
    res.status(201).json(comment);
});
/**
 * @openapi
 * /comments/{id}:
 *   put:
 *     summary: Atualizar comentário
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentário atualizado
 *       404:
 *         description: Não encontrado
 */
exports.router.put('/:id', (0, validate_1.validate)(comments_1.updateCommentSchema), async (req, res) => {
    const id = Number(req.params.id);
    try {
        const comment = await prisma_1.prisma.comment.update({ where: { id }, data: req.body });
        res.json(comment);
    }
    catch {
        res.status(404).json({ message: 'Not found' });
    }
});
/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     summary: Remover comentário
 *     tags: [Comments]
 *     responses:
 *       204:
 *         description: Removido
 *       404:
 *         description: Não encontrado
 */
exports.router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma_1.prisma.comment.delete({ where: { id } });
        res.status(204).send();
    }
    catch {
        res.status(404).json({ message: 'Not found' });
    }
});
