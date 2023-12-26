import { CreateUserDTO } from "../@types/userDTO";
import { UserRepository } from "../../../repositories/db/users/user.repository";
import User from "../domain/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { UserError } from "../errors/user.errors";

type createUserProps = {
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  gender: string;
};
export class SigninUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: createUserProps) {
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
