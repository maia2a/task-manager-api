import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import taskRoute from './routes/tasksRoute';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoute);

app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await prisma.$connect();
  console.log('Database connected');
});