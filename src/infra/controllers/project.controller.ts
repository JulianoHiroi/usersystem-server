import { Request, Response, NextFunction } from "express";
import ProjectService from "../../domain/projects/service/project.service";
import { AuthRequest } from "../polices/auth/auth.middleware";

class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  async getProject(req: Request, res: Response) {
    const { id } = req.params;
    const project = await this.projectService.getProject(id);
    res.status(200).json(project);
  }
  async createProject(req: AuthRequest, res: Response) {
    const { name, description } = req.body;
    const userId = req.userId;
    if (!userId) throw new Error("invalidToken");
    const project = await this.projectService.createProject(
      { name, description },
      userId
    );
    res.status(201).json(project);
  }
  async updateProject(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
    const project = await this.projectService.updateProject({
      id,
      name,
      description,
    });
    res.status(200).json(project);
  }
  async deleteProject(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) throw new Error("invalidToken");
    await this.projectService.deleteProject(id, userId);
    res.status(200).json({ message: "Project deleted" });
  }
  async connectUserToProject(req: AuthRequest, res: Response) {
    const { projectId } = req.params;
    const userId = req.userId;
    if (!userId) throw new Error("invalidToken");
    await this.projectService.connectUserToProject(userId, projectId);
    res.status(200).json({ message: "User connected to project" });
  }
}
export default ProjectController;
