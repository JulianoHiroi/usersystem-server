import { Router } from "express";
import { UserController } from "./controllers/users/userController";
import { UserDomainService } from "./domain/users/ports/Input/implementations/user.domain";
import { GetUserUseCase } from "./domain/users/usecases/getUser.usecase";
import { UpdateUserUseCase } from "./domain/users/usecases/updateUser.usecase";
import { DeleteUserUseCase } from "./domain/users/usecases/deleteUser.usecase";
import { SigninUseCase } from "./domain/users/usecases/signIn.usecase";
import { SignUpUseCase } from "./domain/users/usecases/signUp.usecase";
import { PrismaRepository } from "./repositories/db/users/implementations/prisma.repository";
import { HashServiceBcrypt } from "c:/Users/jucas/OneDrive/Documentos/Projeto/UserSystem/src/providers/hash/implementations/hashBcrypt.service";
import { TokenServiceJWT } from "c:/Users/jucas/OneDrive/Documentos/Projeto/UserSystem/src/providers/token/implementations/tokenJWT.service";
import { UserRepository } from "./repositories/db/users/user.repository";
const userRepository: UserRepository = new PrismaRepository();
const hashService = new HashServiceBcrypt();
const tokenService = new TokenServiceJWT();
const userController = new UserController(
  new UserDomainService(
    new GetUserUseCase(userRepository),
    new UpdateUserUseCase(userRepository),
    new DeleteUserUseCase(userRepository),
    new SigninUseCase(userRepository, hashService, tokenService),
    new SignUpUseCase(userRepository, tokenService, hashService)
  )
);
const routes = Router();
routes.get("/api/user/:id", userController.getUser);
routes.post("/api/user/signin", userController.signIn);
routes.post("/api/user/signup", userController.signUp);
routes.patch("/api/user/:id", userController.updateUser);
routes.delete("/api/user/:id", userController.deleteUser);

export default routes;
