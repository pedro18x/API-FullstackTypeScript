"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const prisma_1 = require("../prisma");
const validate_1 = require("../middlewares/validate");
const users_1 = require("../schemas/users");
exports.router = (0, express_1.Router)();
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Listar usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
exports.router.get('/', async (_req, res) => {
    const users = await prisma_1.prisma.user.findMany();
    res.json(users);
});
/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obter usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário
 *       404:
 *         description: Não encontrado
 */
exports.router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const user = await prisma_1.prisma.user.findUnique({ where: { id } });
    if (!user)
        return res.status(404).json({ message: 'Not found' });
    res.json(user);
});
/**
 * @openapi
 * /users:
 *   post:
 *     summary: Criar usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, name]
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */
exports.router.post('/', (0, validate_1.validate)(users_1.createUserSchema), async (req, res) => {
    const user = await prisma_1.prisma.user.create({ data: req.body });
    res.status(201).json(user);
});
/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Não encontrado
 */
exports.router.put('/:id', (0, validate_1.validate)(users_1.updateUserSchema), async (req, res) => {
    const id = Number(req.params.id);
    try {
        const user = await prisma_1.prisma.user.update({ where: { id }, data: req.body });
        res.json(user);
    }
    catch {
        res.status(404).json({ message: 'Not found' });
    }
});
/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Remover usuário
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: Removido
 *       404:
 *         description: Não encontrado
 */
exports.router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma_1.prisma.user.delete({ where: { id } });
        res.status(204).send();
    }
    catch {
        res.status(404).json({ message: 'Not found' });
    }
});
