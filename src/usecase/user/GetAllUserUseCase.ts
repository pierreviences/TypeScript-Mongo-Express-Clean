import UserRepository from "../../infrastructure/repository/UserRepositoryImpl";

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const data = await this.userRepository.getAllUsers();
    return { success: true, data };
  }
}
