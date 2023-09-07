import UserRepository from "../../infrastructure/repository/UserRepository";
import { validateUserId } from "../../util/validator";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const userIdValidation = validateUserId(userId);

    if (!userIdValidation.success) {
      return userIdValidation;
    }
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, user };
  }
}
