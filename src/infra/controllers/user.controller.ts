import { Request, Response } from "express";
import UserService from "../../domain/users/service/user.service";
import UserError from "../../domain/users/errors/user.errors";
import { AuthRequest } from "../polices/auth/auth.middleware";
class UserController {
  constructor(private readonly userService: UserService) { }

  async getUser(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) return response.status(400).json({ error: "id is required" });

    const user = await this.userService.getUser(id);
    return response.status(200).json(user);
  }
  async getAllUsers(request: Request, response: Response) {
    const users = await this.userService.getAllUsers();

    return response.status(200).json(users);
  }
  async getAllProjectsByUser(request: AuthRequest, response: Response) {
    const id = request.userId;
    if (id === undefined) throw new UserError("invalidToken");
    const user = await this.userService.getAllProjectsByUser(id);
    return response.status(200).json(user);
  }
  async getUserByEmail(request: Request, response: Response) {
    const { email } = request.params;
    const user = await this.userService.getUserByEmail(email);
    return response.status(200).json(user);
  }

  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;
    const token = await this.userService.signIn({ email, password });
    return response.status(200).json(token);
  }
  async signUp(request: Request, response: Response) {
    const { name, email, password, gender, date_of_birth } = request.body;
    if (date_of_birth === undefined || date_of_birth === null) {
      throw new UserError("invalidDateBirth");
    }
    const token = await this.userService.signUp({
      name: name,
      email: email,
      password: password,
      gender: gender,
      date_of_birth: new Date(date_of_birth),
    });

    // Adicionar esta linha para enviar o token na resposta
    return response.status(200).json(token);
  }
  async updateUser(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, password } = request.body;
    const updateUser = await this.userService.updateUser({
      id,
      name,
      email,
      password,
    });
    return response.status(200).json(updateUser);
  }
  async deleteUser(request: AuthRequest, response: Response) {
    const userId = request.userId;
    if (userId === undefined) throw new UserError("invalidToken");
    await this.userService.deleteUser(userId);
    return response.status(204).json();
  }
  async recoveryPassword(request: Request, response: Response) {
    const { email } = request.body;
    await this.userService.recoveryPassword(email);
    return response.status(204).json();
  }
  async changePassword(request: Request, response: Response) {
    const { token, password } = request.body;
    await this.userService.changePassword({ token, password });
    return response.status(204).json();
  }

  async verifyToken(request: AuthRequest, response: Response) {
    const userId = request.userId;
    if (userId === undefined) throw new UserError("invalidToken");
    return response.status(200).json({ userId });
  }
}
export default UserController;
