import { Router } from "express";

import UserController from "./controllers/users/userController";
import UserDomainService from "./domain/users/ports/Input/implementations/user.domain";

const userController = new UserController(new UserDomainService());

const routes = Router();
routes.get("/api/user/:id", userController.getUser.bind(userController));
routes.post("/api/user/signin", userController.signIn.bind(userController));
routes.post("/api/user/signup", userController.signUp.bind(userController));
routes.patch("/api/user/:id", userController.updateUser.bind(userController));
routes.delete("/api/user/:id", userController.deleteUser.bind(userController));

export default routes;
