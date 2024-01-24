export type SignUpDTO = {
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
};
export type SignUpResponseDTO = {
  token: string;
  user: getUserResponseDTO;
};
export type SignInDTO = {
  email: string;
  password: string;
};
export type SignInResponseDTO = {
  token: string;
  user: getUserResponseDTO;
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
export type changePasswordDTO = {
  token: string;
  password: string;
};
