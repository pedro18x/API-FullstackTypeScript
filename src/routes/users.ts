import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { validate } from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from '../schemas/users';

export const router = Router();

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
router.get('/', async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
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
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ message: 'Not found' });
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
router.post('/', validate(createUserSchema), async (req: Request, res: Response) => {
  const user = await prisma.user.create({ data: req.body });
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
router.put('/:id', validate(updateUserSchema), async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.update({ where: { id }, data: req.body });
    res.json(user);
  } catch {
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
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
});
