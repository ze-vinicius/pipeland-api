import { inject } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Class } from "@modules/classes/infra/typeorm/entities/Class";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  teacher_id: string;
}

class CreateClassUseCase {
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, teacher_id }: IRequest): Promise<Class> {
    const user = await this.usersRepository.findById(teacher_id);

    if (!user) {
      throw new AppError("User does not exists");
    }

    if (user.role !== "TEACHER") {
      throw new AppError("The user should be a TEACHER to create a new class");
    }

    const createdClass = await this.classesRepository.create({
      name,
      teacher_id,
    });

    return createdClass;
  }
}

export { CreateClassUseCase };
