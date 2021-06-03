import { ICreateClassDTO } from "@modules/classes/dtos/ICreateClassDTO";
import { IFindClassByIdAndTeacherId } from "@modules/classes/dtos/IFindClassByIdAndTeacherIdDTO";
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

  async findByIdAndTeacherId({
    teacher_id,
    class_id,
  }: IFindClassByIdAndTeacherId): Promise<Class | undefined> {
    const findClass = this.classes.find(
      (c) => c.teacher_id === teacher_id && c.id === class_id
    );

    return findClass;
  }
}

export { ClassesRepositoryInMemory };
