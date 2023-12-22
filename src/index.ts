import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { CreateUserUseCase } from "./modules/users/usecases/createUser.usecase";

import { PrismaRepository } from "./modules/users/repository/implementations/prisma.repository";
import { CreateUserDTO } from "./modules/users/@types/userDTO";
import { UserError } from "./modules/users/errors/user.errors";
import { errorMiddleware } from "./middleware/Error/error.middleware";

prisma.$connect().then(() => {
  console.log("Connected to database");
  const app = express();

  app.use(express.json());
  app.get("/api", (req, res) => {
    res.send("Hello World");
  });
  app.post("/api/users", async (req: Request, res: Response) => {
    const useCase = new CreateUserUseCase(new PrismaRepository());
    const newUser: CreateUserDTO = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
    };
    const user = await useCase.execute(newUser);
    res.json(user);
  });

  // Este middleware será chamado antes do middleware de erro
  app.use(errorMiddleware);
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
