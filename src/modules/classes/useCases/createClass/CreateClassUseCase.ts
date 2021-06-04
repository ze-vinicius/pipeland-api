import { inject, injectable } from "tsyringe";

import { Class } from "@modules/classes/infra/typeorm/entities/Class";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";

interface IRequest {
  name: string;
  teacher_id: string;
}
@injectable()
class CreateClassUseCase {
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute({ name, teacher_id }: IRequest): Promise<Class> {
    const createdClass = await this.classesRepository.create({
      name,
      teacher_id,
    });

    return createdClass;
  }
}

export { CreateClassUseCase };
