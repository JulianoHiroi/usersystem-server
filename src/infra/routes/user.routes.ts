import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserDomainService from "../../domain/users/service/implementations/user.domain";
import { AuthMiddleware } from "../polices/auth/auth.middleware";
import TokenServiceJWT from "../providers/token/implementations/tokenJWT.service";
import UserPrismaRepository from "../repositories/implementations/user.prisma.repository";

const userController = new UserController(new UserDomainService());
const authMiddleware = new AuthMiddleware(
  new TokenServiceJWT(),
  new UserPrismaRepository()
);

const userRoutes = Router();
userRoutes.get(
  "/projects/",
  authMiddleware.auth.bind(authMiddleware),
  userController.getAllProjectsByUser.bind(userController)
);
userRoutes.get(
  "/email/:email",
  userController.getUserByEmail.bind(userController)
);
userRoutes.get("/:id", userController.getUser.bind(userController));
userRoutes.get("/", userController.getAllUsers.bind(userController));
userRoutes.post("/signin", userController.signIn.bind(userController));
userRoutes.post("/signup", userController.signUp.bind(userController));
userRoutes.post(
  "/recoverypassword",
  userController.recoveryPassword.bind(userController)
);
userRoutes.patch(
  "/changepassword",
  userController.changePassword.bind(userController)
);
userRoutes.patch("/:id", userController.updateUser.bind(userController));
userRoutes.delete("/:id", userController.deleteUser.bind(userController));

export default userRoutes;
