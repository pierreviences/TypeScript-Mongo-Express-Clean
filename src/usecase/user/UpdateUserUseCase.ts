import { User } from "../../entities/User";
import UserRepository from "../../infrastructure/repository/UserRepository";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, updates: Partial<User>) {
    const updated = await this.userRepository.updateById(userId, updates);

    if (!updated) {
      return { success: false, error: "User not found" };
    }

    return { success: true };
  }
}
