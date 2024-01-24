import { TokenError } from "../errors/token.error";
import jwt from "jsonwebtoken";
import TokenService, { generateTokenOptions } from "../token.service";

class TokenServiceJWT implements TokenService {
  public sign(payload: object, { expiresIn }: generateTokenOptions) {
    if (!process.env.SECRET) {
      throw new TokenError("EmptySecret");
    }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn });
    return token;
  }

  public verify(token: string) {
    if (!process.env.SECRET) {
      throw new TokenError("EmptySecret");
    }
    let payload;
    try {
      payload = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new TokenError("InvalidToken");
    }
    return payload;
  }
}

export default TokenServiceJWT;
