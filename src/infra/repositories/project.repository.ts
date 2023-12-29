import {
  CreateProjectDTO,
  CreateProjectResponseDTO,
  GetProjectResponseDTO,
  connectUserToProjectDTO,
  updateProjectDTO,
  updateProjectResponseDTO,
} from "../../domain/projects/@types/projectDTO";

abstract class ProjectRepository {
  abstract create(project: CreateProjectDTO): Promise<CreateProjectResponseDTO>;
  abstract connectUserToProject(data: connectUserToProjectDTO): Promise<void>;
  abstract findProject(id: string): Promise<GetProjectResponseDTO | null>;
  abstract update(project: updateProjectDTO): Promise<updateProjectResponseDTO>;
  abstract delete(id: string): Promise<void>;
}
export default ProjectRepository;
