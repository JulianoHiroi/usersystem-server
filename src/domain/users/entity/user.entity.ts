import { randomUUID } from "crypto";
import UserError from "../errors/user.errors";
import Project from "../../projects/entity/project.entity";

export type userProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  date_of_birth: Date;
  projects?: { project: Project; role: string }[];
};
class User {
  public readonly id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  date_of_birth: Date;
  projects: { project: Project; role: string }[];
  constructor(data: userProps) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.date_of_birth = data.date_of_birth;
    this.gender = data.gender;
    this.projects = data.projects || [];
    this.id = data.id || randomUUID();
  }

  public validateEmail() {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(this.email);
  }
  public validateDateBirth() {
    if (this.date_of_birth > new Date()) return false;
  }

  public validadeUser = () => {
    if (!this.name) {
      throw new UserError("emptyName");
    }
    if (!this.validateDateBirth) {
      throw new UserError("invalidDateBirth");
    }
    if (!this.gender) {
      throw new UserError("emptyGender");
    }
    if (!this.validateEmail()) {
      throw new UserError("invalidEmail");
    }
    return true;
  };
}
export default User;
