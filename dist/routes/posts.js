"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const prisma_1 = require("../prisma");
const validate_1 = require("../middlewares/validate");
const posts_1 = require("../schemas/posts");
exports.router = (0, express_1.Router)();
/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Listar posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 */
exports.router.get('/', async (_req, res) => {
    const posts = await prisma_1.prisma.post.findMany();
    res.json(posts);
});
/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Obter post por ID, incluindo autor e comentários
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post com relações
 *       404:
 *         description: Não encontrado
 */
exports.router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const post = await prisma_1.prisma.post.findUnique({
        where: { id },
        include: { author: true, comments: true },
    });
    if (!post)
        return res.status(404).json({ message: 'Not found' });
    res.json(post);
});
/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Criar post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, authorId]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               published:
 *                 type: boolean
 *               authorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post criado
 */
exports.router.post('/', (0, validate_1.validate)(posts_1.createPostSchema), async (req, res) => {
    const post = await prisma_1.prisma.post.create({ data: req.body });
    res.status(201).json(post);
});
/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     summary: Atualizar post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Post atualizado
 *       404:
 *         description: Não encontrado
 */
exports.router.put('/:id', (0, validate_1.validate)(posts_1.updatePostSchema), async (req, res) => {
    const id = Number(req.params.id);
    try {
        const post = await prisma_1.prisma.post.update({ where: { id }, data: req.body });
        res.json(post);
    }
    catch {
        res.status(404).json({ message: 'Not found' });
    }
});
/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Remover post
 *     tags: [Posts]
 *     responses:
 *       204:
 *         description: Removido
 *       404:
 *         description: Não encontrado
 */
exports.router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma_1.prisma.post.delete({ where: { id } });
        res.status(204).send();
    }
    catch {
        res.status(404).json({ message: 'Not found' });
    }
});
