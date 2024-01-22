import ProjectRepository from "../../../infra/repositories/project.repository";
import UserRepository from "../../../infra/repositories/user.repository";
import UserError from "../../users/errors/user.errors";
import ProjectError from "../error/project.error";

class ConnectUserToProjectUseCase {
  constructor(
    private userRepository: UserRepository,
    private projectRepository: ProjectRepository
  ) {}

  async execute(userId: string, projectId: string): Promise<void> {
    if(!projectId || !userId) {
      throw new ProjectError("invalidParams");
    }

    const user = await this.userRepository.findUser({id: userId});
    if(!user) {
      throw new UserError("notFound");
    }
    
    const project = await this.projectRepository.findProject(projectId);
    if(!project) {
      throw new ProjectError("notFound");
    }
    const userProject = project.user.some((user) => user.user.id === userId);
    if(userProject) {
      throw new ProjectError("userAlreadyConnected");
    }
      await this.projectRepository.connectUserToProject({
        user_id: userId,
        project_id: projectId,
        role: "member"
      });
      return;
  }
}
export default ConnectUserToProjectUseCase;