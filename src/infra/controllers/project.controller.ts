import { Request, Response, NextFunction } from "express";
import ProjectService from "../../domain/projects/service/project.service";

class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  async getProject(req: Request, res: Response) {
    const { id } = req.params;
    const project = await this.projectService.getProject(id);
    res.status(200).json(project);
  }
  async createProject(req: Request, res: Response) {
    const { name, description } = req.body;
    const userId = "f350367f-d29e-4373-b2d1-07d73895a945";
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
  async deleteProject(req: Request, res: Response) {
    const { id } = req.params;
    await this.projectService.deleteProject(id);
    res.status(200).json({ message: "Project deleted" });
  }
}
export default ProjectController;
