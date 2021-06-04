import { ICreateClassDTO } from "@modules/classes/dtos/ICreateClassDTO";
import { IFindClassByIdAndTeacherId } from "@modules/classes/dtos/IFindClassByIdAndTeacherIdDTO";
import { Class } from "@modules/classes/infra/typeorm/entities/Class";

import { IClassesRepository } from "../IClassesRepository";

class ClassesRepositoryInMemory implements IClassesRepository {
  private classes: Class[] = [];

  async create({ name, teacher_id, teacher }: ICreateClassDTO): Promise<Class> {
    const createdClass = new Class();

    Object.assign(createdClass, {
      name,
      teacher_id,
      teacher,
    });

    this.classes.push(createdClass);

    return createdClass;
  }

  async findById(class_id: string): Promise<Class | undefined> {
    const findClass = this.classes.find((c) => c.id === class_id);
    return findClass;
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

  async findAllByTeacherId(teacher_id: string): Promise<Class[]> {
    const findClasses = this.classes.filter((c) => c.teacher_id === teacher_id);

    return findClasses;
  }
}

export { ClassesRepositoryInMemory };
