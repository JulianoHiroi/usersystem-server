import User, { userProps } from "../domain/user.entity";

type userPropsMapper = {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  date_of_birth: Date;
};
class UserMapper {
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
  static toDomain(data: userPropsMapper) {
    return new User(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
      },
      data.id
    );
  }
}
export default UserMapper;
