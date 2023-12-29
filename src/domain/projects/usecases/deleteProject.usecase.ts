import ProjectRepository from "../../../infra/repositories/project.repository";
import ProjectError from "../error/project.error";

class DeleteProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(projectId: string) {
    const project = await this.projectRepository.findProject(projectId);

    if (!project) {
      throw new ProjectError("notFound");
    }

    await this.projectRepository.delete(projectId);
  }
}
export default DeleteProjectUseCase;
