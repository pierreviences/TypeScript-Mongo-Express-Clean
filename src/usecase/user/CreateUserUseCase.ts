import { User } from "../../entities/User";
import UserRepository from "../../infrastructure/repository/UserRepositoryImpl";
import { validateNameAndEmail } from "../../util/validator";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string) {
    const validation = validateNameAndEmail(name, email);

    if (!validation.success) {
      console.log(validation);
      return validation;
    }

    const user = new User(name, email);
    const result = await this.userRepository.insertOne(user);

    return {
      success: true,
      user: result,
    };
  }
}
