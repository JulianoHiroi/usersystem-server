import ProjectController from "../controllers/project.controller";
import ProjectDomainService from "../../domain/projects/service/implementations/project.domain";
import { Router } from "express";
const projectController = new ProjectController(new ProjectDomainService());
const projectRoutes = Router();

projectRoutes.get("/:id", projectController.getProject.bind(projectController));
projectRoutes.post(
  "/",
  projectController.createProject.bind(projectController)
);
projectRoutes.patch(
  "/:id",
  projectController.updateProject.bind(projectController)
);
projectRoutes.delete(
  "/:id",
  projectController.deleteProject.bind(projectController)
);

export default projectRoutes;
