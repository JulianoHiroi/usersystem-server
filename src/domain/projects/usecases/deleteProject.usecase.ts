import ProjectRepository from "../../../infra/repositories/project.repository";
import ProjectError from "../error/project.error";

class DeleteProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(projectId: string, userId: string) {
    const project = await this.projectRepository.findProject(projectId);
    const userIsOwner = project?.user.some(
      (user) => user.user.id === userId && user.role === "owner"
    );
    if (!userIsOwner) throw new ProjectError("notOwner");
    if (!project) {
      throw new ProjectError("notFound");
    }

    await this.projectRepository.delete(projectId);
  }
}
export default DeleteProjectUseCase;
