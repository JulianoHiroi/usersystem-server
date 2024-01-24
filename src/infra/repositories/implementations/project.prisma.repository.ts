import { PrismaClient } from "@prisma/client";
import {
  CreateProjectDTO,
  CreateProjectResponseDTO,
  GetProjectDTO,
  GetProjectResponseDTO,
  connectUserToProjectDTO,
} from "../../../domain/projects/@types/projectDTO";
import ProjectRepository from "../project.repository";
const prisma = new PrismaClient();
class ProjectPrismaRepository implements ProjectRepository {

  

  async findProject(id: string): Promise<GetProjectResponseDTO | null> {
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
    const newProject = await prisma.project.create({ data: project });
    return newProject;
  }
  async connectUserToProject(data: connectUserToProjectDTO): Promise<void> {
    const project = await prisma.userProject.create({
      data: {
        userId: data.user_id,
        projectId: data.project_id,
        role: data.role,
      },
    });
    return;
  }
  async getAllByUser(userId: string): Promise<GetProjectDTO[]> {
    const projects = await prisma.project.findMany({
      where: {
        user: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        user: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            role: true,
          },
        },
      },
    });
    return projects;
  }
  async update(project: any): Promise<any> {
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
