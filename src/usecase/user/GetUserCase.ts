import UserRepository from "../../infrastructure/repository/UserRepository";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, user };
  }
}
