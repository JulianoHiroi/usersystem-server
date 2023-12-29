import { PrismaClient } from "@prisma/client";
import {
  CreateProjectDTO,
  CreateProjectResponseDTO,
  GetProjectResponseDTO,
  connectUserToProjectDTO,
} from "../../../domain/projects/@types/projectDTO";
import ProjectRepository from "../project.repository";
class ProjectPrismaRepository implements ProjectRepository {
  async findProject(id: string): Promise<GetProjectResponseDTO | null> {
    const prisma = new PrismaClient();
    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            user: true,
            role: true,
          },
        },
      },
    });
    return project;
  }
  async create(project: CreateProjectDTO): Promise<CreateProjectResponseDTO> {
    const prisma = new PrismaClient();
    const newProject = await prisma.project.create({ data: project });
    return newProject;
  }
  async connectUserToProject(data: connectUserToProjectDTO): Promise<void> {
    const prisma = new PrismaClient();

    const project = await prisma.userProject.create({
      data: {
        userId: data.user_id,
        projectId: data.project_id,
        role: data.role,
      },
    });
    return;
  }
  async update(project: any): Promise<any> {
    const prisma = new PrismaClient();
    const updateProject = await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        name: project.name,
        description: project.description,
      },
    });
    return updateProject;
  }
  async delete(id: string): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.userProject.deleteMany({
      where: {
        projectId: id,
      },
    });

    await prisma.project.delete({
      where: {
        id: id,
      },
    });
    return;
  }
}

export default ProjectPrismaRepository;
