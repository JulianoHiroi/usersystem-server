import { projectsProps } from "../domain/user.entity";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
};
export type SiginUserDTO = {
  email: string;
  password: string;
};

export type getUserResponseDTO = {
  id: string;
  name: string;
  email: string;
  date_of_birth: Date;
  gender: string;
};

export type updateUserDTO = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
};

export type FindUserDTO = {
  id?: string;
  email?: string;
};
