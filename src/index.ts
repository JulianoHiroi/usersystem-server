import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./infra/routes/user.routes";
import projectRoutes from "./infra/routes/project.routes";
import cors from "cors";
const prisma = new PrismaClient();

import { errorMiddleware } from "./infra/polices/error/error.middleware";

prisma.$connect().then(() => {
  console.log("Connected to database");
  const app = express();
  app.use(cors()); 
  app.use(express.json());
  app.get("/api", (req, res) => {
    res.send("Hello World");
  });

  app.use("/api/users", userRoutes);
  app.use("/api/projects", projectRoutes);
  // Este middleware será chamado antes do middleware de erro
  app.use(errorMiddleware);
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
});
