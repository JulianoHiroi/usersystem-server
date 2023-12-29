import ProjectRepository from "../../../infra/repositories/project.repository";
import UserRepository from "../../../infra/repositories/user.repository";
import UserError from "../../users/errors/user.errors";
import Project from "../entity/project.entity";
import ProjectMapper from "../mappers/project.mapper";

type CreateProjectProps = {
  name: string;
  description: string;
  userId: string;
};
type CreateProjectResponse = {
  id: string;
  name: string;
  description: string;
};

class CreateProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: CreateProjectProps): Promise<CreateProjectResponse> {
    const user = await this.userRepository.findUser({ id: data.userId });
    if (!user) {
      throw new UserError("notFound");
    }

    const project = new Project({
      name: data.name,
      description: data.description,
    });
    const projectMapped = ProjectMapper.toPersist(project);
    const newProject = await this.projectRepository.create(projectMapped);
    await this.projectRepository.connectUserToProject({
      user_id: user.id,
      project_id: newProject.id,
      role: "owner",
    });
    return newProject;
  }
}
export default CreateProjectUseCase;
