// infrastructure/express/controllers/UserController.ts
import { Request, Response } from "express";
import { CreateUserUseCase } from "../../usecase/user/CreateUserUseCase";

export class UserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const user = await this.createUserUseCase.execute(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
