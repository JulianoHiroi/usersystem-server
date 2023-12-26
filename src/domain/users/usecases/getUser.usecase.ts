import { UserError } from "../errors/user.errors";
import { UserRepository } from "../../../repositories/db/users/user.repository";
import { getUserResponseDTO } from "../@types/userDTO";

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id?: string, email?: string): Promise<getUserResponseDTO> {
    const user = await this.userRepository.findUser({ id: id, email: email });
    if (!user) {
      throw new UserError("notFound");
    }
    return user;
  }
}
