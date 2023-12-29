import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserDomainService from "../../domain/users/service/implementations/user.domain";
const userController = new UserController(new UserDomainService());

const userRoutes = Router();
userRoutes.get("/:id", userController.getUser.bind(userController));
userRoutes.get("/", userController.getAllUsers.bind(userController));
userRoutes.post("/signin", userController.signIn.bind(userController));
userRoutes.post("/signup", userController.signUp.bind(userController));
userRoutes.patch("/:id", userController.updateUser.bind(userController));
userRoutes.delete("/:id", userController.deleteUser.bind(userController));

export default userRoutes;
