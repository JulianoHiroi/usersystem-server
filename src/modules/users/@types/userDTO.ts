import { projectsProps } from "../entity/user.entity";

export type SignUpDTO = {
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
};
export type SignInDTO = {
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
export type CreateUserDTO = {
  id: string;
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
};
