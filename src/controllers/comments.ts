import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getComments = async (req: any, res: Response) => {

  try {
    const { taskId } = req.params;

    const comments = await prisma.comment.findMany({
      where: {
        taskId
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar comentários" });
  }
};

export const createComment = async (req: any, res: Response) => {
  try {
    const { taskId } = req.params;
    const { text } = req.body;

    const comment = await prisma.comment.create({
      data: {
        text,
        user: { connect: { id: req.userId } },
        task: { connect: { id: taskId } }
      }
    });

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Falha ao criar comentário" });
  }
};

export const deleteComment = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.comment.delete({ where: { id } });

    res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Falha ao deletar comentário" });
  }
};
