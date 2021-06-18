import { inject, injectable } from "tsyringe";

import { Student } from "@modules/classes/infra/typeorm/entities/Student";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { AppError } from "@shared/errors/AppError";

interface ICreateStudent {
  user_id: string;
}

interface IRequest {
  class_id: string;
  teacher_id: string;
  students: ICreateStudent[];
}
@injectable()
class AddStudentsToClassUseCase {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute({
    class_id,
    teacher_id,
    students,
  }: IRequest): Promise<Student[]> {
    const findClass = await this.classesRepository.findById(class_id);

    if (!findClass) {
      throw new AppError("A class with this teacher was not found");
    }

    if (findClass.teacher_id !== teacher_id) {
      throw new AppError("You are not authorized", 501);
    }

    const formatStudents = students.map((student) => ({
      ...student,
      class: findClass,
    }));

    const newStudents = await this.studentsRepository.bulkCreate(
      formatStudents
    );

    return newStudents;
  }
}

export { AddStudentsToClassUseCase };
