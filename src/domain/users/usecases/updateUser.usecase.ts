import UserError from "../errors/user.errors";
import UserMapper from "../mappers/user.mapper";
import UserRepository from "../../../infra/repositories/user.repository";

type UpdateUserProps = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
};
type UpdateUserResponse = {
  id: string;
  name: string;
  email: string;
  gender: string;
  date_of_birth: Date;
};

export class UpdateUserUseCase {
  private readonly userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(data: UpdateUserProps): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findUser({ id: data.id });
    if (!user) {
      throw new UserError("notFound");
    }
    if (data.name) {
      user.name = data.name;
    }
    if (data.email && data.email !== user.email) {
      const userAlreadyExists = await this.userRepository.findUser({
        email: data.email,
      });
      if (userAlreadyExists) {
        throw new UserError("alreadyExists");
      }
      user.email = data.email;
    }
    if (data.password) {
      user.password = data.password;
    }
    const mappedUser = UserMapper.toDomain(user);
    mappedUser.validadeUser();
    const mappedUserToPersist = UserMapper.toPersist(mappedUser);

    const updatedUser = await this.userRepository.updateUser(
      mappedUserToPersist
    );
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      date_of_birth: updatedUser.date_of_birth,
    };
  }
}
export default UpdateUserUseCase;
