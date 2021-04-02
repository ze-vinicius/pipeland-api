import { ICreateClassDTO } from "@modules/classes/dtos/ICreateClassDTO";
import { Class } from "@modules/classes/infra/typeorm/entities/Class";

import { IClassesRepository } from "../IClassesRepository";

class ClassesRepositoryInMemory implements IClassesRepository {
  private classes: Class[] = [];

  async create({ name, teacher_id }: ICreateClassDTO): Promise<Class> {
    const createdClass = new Class();

    Object.assign(createdClass, {
      name,
      teacher_id,
    });

    this.classes.push(createdClass);

    return createdClass;
  }
}

export { ClassesRepositoryInMemory };
