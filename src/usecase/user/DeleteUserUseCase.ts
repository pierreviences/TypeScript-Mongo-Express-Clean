import UserRepository from "../../infrastructure/repository/UserRepositoryImpl";
import { validateUserId } from "../../util/validator";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const userIdValidation = validateUserId(userId);
    if (!userIdValidation.success) {
      return userIdValidation;
    }
    const deleted = await this.userRepository.deleteById(userId);

    if (!deleted) {
      return { success: false, error: "User not found" };
    }

    return { success: true, deleted };
  }
}
