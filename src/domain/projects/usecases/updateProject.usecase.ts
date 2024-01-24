import ProjectRepository from "../../../infra/repositories/project.repository";
import ProjectError from "../error/project.error";

type updateProjectProps = {
  id: string;
  name?: string;
  description?: string;
};
type updateProjectResponse = {
  id: string;
  name: string;
  description: string;
};
class updateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(project: updateProjectProps): Promise<updateProjectResponse> {
    const projectDB = await this.projectRepository.findProject(project.id);
    if (!projectDB) {
      throw new ProjectError("notFound");
    }
    if (!project.name) {
      project.name = projectDB.name;
    }
    if (!project.description) {
      project.description = projectDB.description;
    }
    const Updateproject = await this.projectRepository.update(project);
    return Updateproject;
  }
}

export default updateProjectUseCase;
