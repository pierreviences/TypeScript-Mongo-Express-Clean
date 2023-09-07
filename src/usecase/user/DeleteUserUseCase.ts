import UserRepository from "../../infrastructure/repository/UserRepository";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const deleted = await this.userRepository.deleteById(userId);

    if (!deleted) {
      return { success: false, error: "User not found" };
    }

    return { success: true };
  }
}
