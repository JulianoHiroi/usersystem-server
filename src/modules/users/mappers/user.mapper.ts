import User from "../domain/user.entity";

export class UserMapper {
  static toPersist(user: User) {
    return {
      id: user.id,
      name: user.data.name,
      email: user.data.email,
      password: user.data.password,
      gender: user.data.gender,
      date_of_birth: new Date(user.data.date_of_birth),
    };
  }
}
