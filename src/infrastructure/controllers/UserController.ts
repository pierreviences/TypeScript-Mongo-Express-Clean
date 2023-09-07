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
}
