import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get all tasks
export const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        assignee: { id: req.user.id },
        include: { comments: true },
        orderBy: { createdAt: 'desc' }
      }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};

//Create a task
export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description, dueDate, priority, tags } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        priority,
        tags,
        assignee: { connect: { id: req.user.id } }
      }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};

//Update a task
export const updateTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, tags } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        status,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        tags
      }
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

//Delete a task
export const deleteTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id } });
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
};

//Get a task
export const getTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({ where: { id }, include: { comments: true } });
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
};