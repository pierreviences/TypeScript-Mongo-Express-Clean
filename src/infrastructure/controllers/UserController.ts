import { Request, Response } from "express";
import { CreateUserUseCase } from "../../usecase/user/CreateUserUseCase";
import { GetUserUseCase } from "../../usecase/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../usecase/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../usecase/user/DeleteUserUseCase";
import { GetAllUsersUseCase } from "../../usecase/user/GetAllUserUseCase";

export class UserController {
  private createUserUseCase: CreateUserUseCase;
  private getUserUseCase: GetUserUseCase;
  private updateUserUseCase: UpdateUserUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  private getAllUsersUseCase: GetAllUsersUseCase;

  constructor(
    createUserUseCase: CreateUserUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    getAllUsersUseCase: GetAllUsersUseCase
  ) {
    this.createUserUseCase = createUserUseCase;
    this.getUserUseCase = getUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
    this.getAllUsersUseCase = getAllUsersUseCase;
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const userResponse = await this.createUserUseCase.execute(name, email);
      if (userResponse.success) {
        res.status(201).json(userResponse);
      } else {
        res.status(400).json(userResponse);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const userResponse = await this.getUserUseCase.execute(userId);
      if (userResponse.success) {
        res.status(200).json(userResponse);
      } else {
        res.status(404).json(userResponse);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const { name, email } = req.body;
      const userResponse = await this.updateUserUseCase.execute(userId, {
        name,
        email,
      });
      if (userResponse.success) {
        res.status(200).json(userResponse);
      } else {
        res.status(404).json(userResponse);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const userResponse = await this.deleteUserUseCase.execute(userId);
      if (userResponse.success) {
        res.status(204).send();
      } else {
        res.status(404).json(userResponse);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const usersResponse = await this.getAllUsersUseCase.execute();
      if (usersResponse.success) {
        res.status(200).json(usersResponse);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
