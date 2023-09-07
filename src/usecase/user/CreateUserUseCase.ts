import { User } from "../../entities/User";
import UserRepository from "../../infrastructure/database/UserRepository";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string) {
    if (!name || !email) {
      return {
        success: false,
        error: "Name and email are required",
      };
    }

    const user = new User(name, email);
    const result = await this.userRepository.insertOne(user);

    return {
      success: true,
      user: result,
    };
  }
}
