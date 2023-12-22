import { User } from "@prisma/client";

export abstract class UserRepository {
  abstract findUser(email?: string, id?: string): Promise<User | null>;
  abstract createUser(data: User): Promise<User>;
}
