import { User } from "../../entities/User";
import UserRepository from "../../infrastructure/repository/UserRepositoryImpl";
import { validateNameAndEmail, validateUserId } from "../../util/validator";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, updates: Partial<User>) {
    const userIdValidation = validateUserId(userId);

    if (!userIdValidation.success) {
      return userIdValidation;
    }

    const validation = validateNameAndEmail(updates.name, updates.email);
    if (!validation.success) {
      return validation;
    }

    const updated = await this.userRepository.updateById(userId, updates);

    if (!updated) {
      return { success: false, error: "User not found" };
    }

    return { success: true };
  }
}
