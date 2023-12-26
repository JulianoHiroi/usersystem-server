export type CreateUserDTO = {
  id: string;
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
};

export type updateUserDTO = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
};
