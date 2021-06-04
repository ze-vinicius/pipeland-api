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

  async findById(class_id: string): Promise<Class | undefined> {
    const findClass = await this.ormRepository.findOne({
      relations: ["teacher"],
      where: { id: class_id },
    });

    return findClass;
  }

  async findAllByTeacherId(teacher_id: string): Promise<Class[]> {
    const findClasses = await this.ormRepository.find({
      relations: ["teacher"],
      where: {
        teacher_id,
      },
    });

    return findClasses;
  }
}

export { ClassesRepository };
