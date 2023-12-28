import { Router } from "express";
import { AuthMiddleware } from "c:/Users/jucas/OneDrive/Documentos/Projeto/UserSystem/src/polices/auth/auth.middleware";
import UserController from "./controllers/userController";
import UserDomainService from "./modules/users/service/implementations/user.domain";
import TokenServiceJWT from "./providers/token/implementations/tokenJWT.service";
import PrismaRepository from "./modules/users/repositories/implementations/prisma.repository";

const userController = new UserController(new UserDomainService());
const authMiddleware = new AuthMiddleware(
  new TokenServiceJWT(),
  new PrismaRepository()
);
const routes = Router();
routes.get("/api/user/:id", userController.getUser.bind(userController));
routes.get(
  "/api/user",
  authMiddleware.auth.bind(authMiddleware),
  userController.getAllUsers.bind(userController)
);
routes.post("/api/user/signin", userController.signIn.bind(userController));
routes.post("/api/user/signup", userController.signUp.bind(userController));
routes.patch("/api/user/:id", userController.updateUser.bind(userController));
routes.delete("/api/user/:id", userController.deleteUser.bind(userController));

export default routes;
