import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  photo: string;
}

@injectable()
class UpdateUserPhotoUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ photo, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (user.photo) {
      await this.storageProvider.delete(user.photo, "avatar");
    }

    await this.storageProvider.save(photo, "avatar");

    user.photo = photo;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserPhotoUseCase };
