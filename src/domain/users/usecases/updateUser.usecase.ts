import { updateUserDTO } from "../@types/userDTO";
import { UserError } from "../errors/user.errors";
import { UserMapper } from "../mappers/user.mapper";
import { UserRepository } from "../../../repositories/db/users/user.repository";

type updatedUserProps = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
};

export class UpdateUserUseCase {
  private readonly userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(data: updatedUserProps) {
    const user = await this.userRepository.findUser({ email: data.id });
    if (!user) {
      throw new UserError("notFound");
    }
    if (data.name) {
      user.name = data.name;
    }
    if (data.email) {
      const userAlreadyExists = await this.userRepository.findUser({
        email: data.id,
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
    return updatedUser;
  }
}
