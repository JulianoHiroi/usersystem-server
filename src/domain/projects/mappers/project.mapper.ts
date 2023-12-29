import Project from "../entity/project.entity";

class ProjectMapper {
  static toPersist(project: Project) {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
    };
  }
}
export default ProjectMapper;
