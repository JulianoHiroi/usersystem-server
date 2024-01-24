import {
  CreateProjectRequestDTO,
  CreateProjectResponseDTO,
  GetProjectResponseDTO,
  updateProjectDTO,
  updateProjectResponseDTO,
} from "../@types/projectDTO";

abstract class ProjectService {
  constructor() {}

  abstract createProject(
    data: CreateProjectRequestDTO,
    userId: string
  ): Promise<CreateProjectResponseDTO>;
  abstract getProject(id: string): Promise<GetProjectResponseDTO>;
  abstract updateProject(
    data: updateProjectDTO
  ): Promise<updateProjectResponseDTO>;
  abstract deleteProject(projectId: string, userId: string): Promise<void>;
  abstract connectUserToProject(userId: string, projectId: string): Promise<void>;
}
export default ProjectService;
