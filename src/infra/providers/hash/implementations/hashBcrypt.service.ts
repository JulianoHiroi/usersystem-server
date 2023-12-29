import HashService from "../hash.service";
import bcrypt from "bcrypt";
import { HashError } from "../errors/hash.error";

class HashServiceBcrypt implements HashService {
  public hash(password: string): string {
    if (!process.env.SALT_ROUNDS) {
      throw new HashError("EmptySaltRounds");
    }
    const roundSalt = parseInt(process.env.SALT_ROUNDS);
    const hashPassword = bcrypt.hashSync(password, roundSalt);
    return hashPassword;
  }
  public compare(password: string, hash: string): boolean {
    const isValid = bcrypt.compareSync(password, hash);
    return isValid;
  }
}

export default HashServiceBcrypt;
