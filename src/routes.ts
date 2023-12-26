import { Router } from "express";

import UserController from "./controllers/users/userController";
import UserService from "./domain/users/ports/Input/user.service";
import PrismaRepository from "./repositories/db/users/implementations/prisma.repository";
import TokenServiceJWT from "./providers/token/implementations/tokenJWT.service";
import HashServiceBcrypt from "./providers/hash/implementations/hashBcrypt.service";

import GetUserUseCase from "./domain/users/usecases/getUser.usecase";
import UpdateUserUseCase from "./domain/users/usecases/updateUser.usecase";
import DeleteUserUseCase from "./domain/users/usecases/deleteUser.usecase";
import SigninUseCase from "./domain/users/usecases/signIn.usecase";
import SignUpUseCase from "./domain/users/usecases/signUp.usecase";
import UserDomainService from "./domain/users/ports/Input/implementations/user.domain";

const userRepository = new PrismaRepository();
const getUserUseCase = new GetUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const signInUseCase = new SigninUseCase(
  userRepository,
  new HashServiceBcrypt(),
  new TokenServiceJWT()
);
const signUpUseCase = new SignUpUseCase(
  userRepository,
  new TokenServiceJWT(),
  new HashServiceBcrypt()
);
const userController = new UserController(
  new UserDomainService(
    getUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    signInUseCase,
    signUpUseCase
  )
);

const routes = Router();
routes.get("/api/user/:id", userController.getUser);
routes.post("/api/user/signin", userController.signIn);
routes.post("/api/user/signup", userController.signUp);
routes.patch("/api/user/:id", userController.updateUser);
routes.delete("/api/user/:id", userController.deleteUser);

export default routes;
