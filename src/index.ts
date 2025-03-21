import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";

dotenv.config();
const app = express();
//Prisma client
const prisma = new PrismaClient();

app.use(express.json());

//Rotas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager API está rodando!");
})

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`Servidor rodando na porta ${port}`);
  await prisma.$connect();
  console.log("Conectado ao banco de dados");
})