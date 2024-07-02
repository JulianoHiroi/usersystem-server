import ProjectController from "../controllers/project.controller";
import ProjectDomainService from "../../domain/projects/service/implementations/project.domain";
import { Router } from "express";
import { AuthMiddleware } from "../polices/auth/auth.middleware";
import TokenServiceJWT from "../providers/token/implementations/tokenJWT.service";
import UserPrismaRepository from "../repositories/implementations/user.prisma.repository";
const projectController = new ProjectController(new ProjectDomainService());

const authMiddleware = new AuthMiddleware(
  new TokenServiceJWT(),
  new UserPrismaRepository()
);

const projectRoutes = Router();

projectRoutes.get("/:id", projectController.getProject.bind(projectController));
projectRoutes.post(
  "/",
  authMiddleware.auth.bind(authMiddleware),
  projectController.createProject.bind(projectController)
);

projectRoutes.delete(
  "/:id",
  authMiddleware.auth.bind(authMiddleware),
  projectController.deleteProject.bind(projectController)
);
projectRoutes.patch(
  "/invite/:projectId",
  authMiddleware.auth.bind(authMiddleware),
  projectController.connectUserToProject.bind(projectController)
);
/*
projectRoutes.patch(
  "/:id",
  projectController.updateProject.bind(projectController)
);

*/

export default projectRoutes;
