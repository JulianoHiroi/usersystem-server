import { Request, Response } from "express";
import UserService from "../modules/users/service/user.service";

class UserController {
  constructor(private readonly userService: UserService) {}

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

  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;
    const token = await this.userService.signIn({ email, password });
    return response.status(200).json(token);
  }
  async signUp(request: Request, response: Response) {
    const { name, email, password, gender, date_of_birth } = request.body;
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
  async deleteUser(request: Request, response: Response) {
    const { id } = request.params;
    console.log(this.userService);
    await this.userService.deleteUser(id);
    return response.status(204).json();
  }
}
export default UserController;
