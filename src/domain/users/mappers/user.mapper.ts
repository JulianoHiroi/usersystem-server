import User, { userProps } from "../entity/user.entity";

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
      name: user.name,
      email: user.email,
      password: user.password,
      gender: user.gender,
      date_of_birth: user.date_of_birth,
    };
  }
  static toDomain(data: userProps) {
    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
    });
  }
}
export default UserMapper;
