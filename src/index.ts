import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { errorMiddleware } from "./polices/error/error.middleware";
import routes from "./routes";

prisma.$connect().then(() => {
  console.log("Connected to database");
  const app = express();

  app.use(express.json());
  app.get("/api", (req, res) => {
    res.send("Hello World");
  });
  // Este middleware será chamado antes do middleware de erro
  app.use(routes);
  app.use(errorMiddleware);
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
