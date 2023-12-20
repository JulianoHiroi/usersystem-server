type projectsProps = { role: string; project: string }[];
export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  projects: projectsProps = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    projects?: projectsProps
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    if (projects) this.projects = projects;
  }
}
