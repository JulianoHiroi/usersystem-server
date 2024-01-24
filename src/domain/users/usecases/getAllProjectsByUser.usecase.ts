import ProjectRepository from "../../../infra/repositories/project.repository";
import UserRepository from "../../../infra/repositories/user.repository";
import UserError from "../errors/user.errors";

type GetAllProjectsResponse = {
  id: string;
  name: string;
  description: string;
  user: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    role: string;
  }[];
}

class GetAllProjectsByUserUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(userId: string): Promise<GetAllProjectsResponse[]> {
    const userExists = await this.userRepository.findUser({ id: userId });
    if (!userExists) throw new UserError("notFound");
    const response = await this.projectRepository.getAllByUser(userId);
    return response;
  }
}

export default GetAllProjectsByUserUseCase;
