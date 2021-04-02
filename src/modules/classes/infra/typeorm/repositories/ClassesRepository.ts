import { getRepository, Repository } from "typeorm";

import { ICreateClassDTO } from "@modules/classes/dtos/ICreateClassDTO";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";

import { Class } from "../entities/Class";

class ClassesRepository implements IClassesRepository {
  ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  async create(data: ICreateClassDTO): Promise<Class> {
    const createdClass = this.ormRepository.create(data);

    await this.ormRepository.save(createdClass);

    return createdClass;
  }
}

export { ClassesRepository };
