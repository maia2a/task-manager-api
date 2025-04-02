import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import taskRoute from './routes/tasksRoute';
import commentRoute from './routes/comments';
import analyticsRoute from './routes/analytics';
import { authMiddleware } from './middleware/authMiddleware';
import { Server } from 'socket.io';
import { createServer } from 'http';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middleware para lidar com CORS
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoute);
app.use('/api/analytics', analyticsRoute);

app.use('/api/comments', commentRoute);

// Middleware para autenticação
app.use(authMiddleware as any);
app.use('/api/comments', commentRoute);
app.use('/api/tasks', taskRoute);


app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

const PORT = process.env.PORT || 3001;
// Inicia o servidor HTTP
httpServer.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await prisma.$connect();
  console.log('Connected to the database');
});

// Configuração do Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
  // Lidar com desconexões
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  // Lidar updates
  socket.on('taskUpdate', (taskId) => {
    socket.broadcast.emit('taskUpdated', taskId);
  });
});

