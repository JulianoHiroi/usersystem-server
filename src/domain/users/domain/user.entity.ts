import { randomUUID } from "crypto";
import { UserError } from "../errors/user.errors";

export type projectsProps = { role: string; project: string }[];

export type userProps = {
  name: string;
  email: string;
  password: string;
  gender: string;
  date_of_birth: Date;
  projects?: projectsProps;
};
class User {
  public readonly id: string;
  data: userProps = {
    name: "",
    email: "",
    password: "",
    gender: "",
    date_of_birth: new Date(),
  };

  constructor(data: userProps, id?: string) {
    this.data = data;
    if (data.projects) this.data.projects = data.projects;
    this.id = id || randomUUID();
  }

  public validateEmail() {
    const { email } = this.data;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }
  public validateDateBitrh() {
    const { date_of_birth } = this.data;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date_of_birth.toString());
  }

  public validadeUser = () => {
    const { name } = this.data;
    if (!name) {
      throw new UserError("emptyName");
    }
    if (!this.validateDateBitrh) {
      throw new UserError("invalidDateBirth");
    }
    if (!this.data.gender) {
      throw new UserError("emptyGender");
    }
    if (!this.validateEmail()) {
      throw new UserError("invalidEmail");
    }
    return true;
  };
}
export default User;
