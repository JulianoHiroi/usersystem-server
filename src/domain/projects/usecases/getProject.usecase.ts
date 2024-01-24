import ProjectRepository from "../../../infra/repositories/project.repository";
import { GetUserResponse } from "../../users/usecases/getUser.usecase";
import ProjectError from "../error/project.error";

type GetProjectResponse = {
  id: string;
  name: string;
  description: string;
  user: {
    role: string;
    user: GetUserResponse;
  }[];
};

class GetProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(projectId: string): Promise<GetProjectResponse> {
    const project = await this.projectRepository.findProject(projectId);
    if (!project) {
      throw new ProjectError("notFound");
    }
    return project;
  }
}
export default GetProjectUseCase;
