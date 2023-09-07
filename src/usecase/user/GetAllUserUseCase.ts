import UserRepository from "../../infrastructure/repository/UserRepository";

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.getAllUsers();
    return { success: true, users };
  }
}
