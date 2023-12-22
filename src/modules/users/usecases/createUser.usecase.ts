import { CreateUserDTO } from "../@types/userDTO";
import { UserRepository } from "../repository/user.repository";
import User from "../domain/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { UserError } from "../errors/user.errors";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findUser(data.email);

    if (userAlreadyExists) {
      throw new UserError("alreadyExists");
    }

    const user = new User(data);
    console.log(user.data);
    user.validadeUser();
    const mappedUser = UserMapper.toPersist(user);
    await this.userRepository.createUser(mappedUser);
    return mappedUser;
  }
}
