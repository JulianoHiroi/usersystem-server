import { randomUUID } from "crypto";
import User from "../../users/entity/user.entity";

export type projectProps = {
  id?: string;
  name: string;
  description: string;
  users?: { user: User; role: string }[];
};
class Project {
  name: string;
  description: string;
  id: string;
  users: { user: User; role: string }[];
  constructor(data: projectProps) {
    this.name = data.name;
    this.description = data.description;
    this.users = data.users || [];
    this.id = data.id || randomUUID();
  }
}
export default Project;
