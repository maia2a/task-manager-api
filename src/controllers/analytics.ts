import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAnalytics = async (req: any, res: Response) => {
  try {
    //Get users analytics
    const tasks = await prisma.task.findMany({
      where: { assignee: { id: req.user.id } },
      select: { status: true, createdAt: true, dueDate: true },
    });
    const stats = {
      totalTasks: tasks.length,
      tasksByStatus: tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      overdueTasks: tasks.filter(task => task.dueDate && new Date() > task.dueDate && task.status !== 'done').length,
      weeklyActivity: {}
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar as análises" });
  }
};