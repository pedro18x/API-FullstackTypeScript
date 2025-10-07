import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { validate } from '../middlewares/validate';
import { createCommentSchema, updateCommentSchema } from '../schemas/comments';

export const router = Router();

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Listar comentários
 *     tags: [Comments]
 */
router.get('/', async (_req: Request, res: Response) => {
  const comments = await prisma.comment.findMany();
  res.json(comments);
});

/**
 * @openapi
 * /comments/{id}:
 *   get:
 *     summary: Obter comentário por ID
 *     tags: [Comments]
 */
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) return res.status(404).json({ message: 'Not found' });
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
router.post('/', validate(createCommentSchema), async (req: Request, res: Response) => {
  const comment = await prisma.comment.create({ data: req.body });
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
router.put('/:id', validate(updateCommentSchema), async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const comment = await prisma.comment.update({ where: { id }, data: req.body });
    res.json(comment);
  } catch {
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
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.comment.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
});
