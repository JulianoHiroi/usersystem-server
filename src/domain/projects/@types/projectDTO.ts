import { getUserResponseDTO } from "../../users/@types/userDTO";
export type CreateProjectRequestDTO = {
  name: string;
  description: string;
};
export type CreateProjectDTO = {
  id: string;
  name: string;
  description: string;
};
export type CreateProjectResponseDTO = {
  id: string;
  name: string;
  description: string;
};
export type connectUserToProjectDTO = {
  user_id: string;
  project_id: string;
  role: string;
};

export type GetProjectDTO = {
  id: string;
  name: string;
  description: string;
  user: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    role: string;
  }[];
};

export type GetProjectResponseDTO = {
  id: string;
  name: string;
  description: string;
  user: {
    role: string;
    user: getUserResponseDTO;
  }[];
};
export type updateProjectDTO = {
  id: string;
  name?: string;
  description?: string;
};
export type updateProjectResponseDTO = {
  id: string;
  name: string;
  description: string;
};
