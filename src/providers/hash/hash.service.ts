export abstract class HashService {
  abstract hash(password: string): string;
  abstract compare(password: string, hash: string): boolean;
}
