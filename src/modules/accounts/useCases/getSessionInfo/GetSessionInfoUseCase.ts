import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class GetSessionInfoUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User is not authenticated", 401);
    }

    return user;
  }
}

export { GetSessionInfoUseCase };
