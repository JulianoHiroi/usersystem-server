import UserError from "../errors/user.errors";
import UserRepository from "../../../infra/repositories/user.repository";

export type GetUserResponse = {
  id: string;
  name: string;
  email: string;
  date_of_birth: Date;
  gender: string;
};

class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<GetUserResponse> {
    const user = await this.userRepository.findUser({
      id: id,
    });
    if (!user) {
      throw new UserError("notFound");
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      date_of_birth: user.date_of_birth,
    };
  }
}
export default GetUserUseCase;
