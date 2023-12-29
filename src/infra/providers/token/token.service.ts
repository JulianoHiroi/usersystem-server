export interface generateTokenOptions {
  expiresIn: string;
}
abstract class TokenService {
  abstract sign(payload: object, options?: generateTokenOptions): string;
  abstract verify(token: string): string | object;
}
export default TokenService;
