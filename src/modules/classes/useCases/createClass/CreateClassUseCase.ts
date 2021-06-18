import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IClassesInviteTokensRepository } from "@modules/classes/repositories/IClassesInviteTokensRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  teacher_id: string;
}

interface IResponse {
  id: string;
  name: string;
  teacher_name: string;
  create_date: Date;
  active: boolean;
}
@injectable()
class CreateClassUseCase {
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ClassesInviteTokensRepository")
    private classesInviteTokensRepository: IClassesInviteTokensRepository
  ) {}

  public async execute({ name, teacher_id }: IRequest): Promise<IResponse> {
    const teacher = await this.usersRepository.findById(teacher_id);

    if (!teacher) {
      throw new AppError("User unauthorized");
    }

    const createdClass = await this.classesRepository.create({
      name,
      teacher_id,
    });

    await this.classesInviteTokensRepository.generate(createdClass.id);

    return {
      id: createdClass.id,
      name: createdClass.name,
      teacher_name: teacher.name,
      create_date: createdClass.created_at,
      active: createdClass.active,
    };
  }
}

export { CreateClassUseCase };
