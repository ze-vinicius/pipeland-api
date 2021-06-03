import { ICreateStudentDTO } from "@modules/classes/dtos/ICreateStudentDTO";
import { Student } from "@modules/classes/infra/typeorm/entities/Student";

import { IStudentsRepository } from "../IStudentsRepository";

class StudentsRepositoryInMemory implements IStudentsRepository {
  private students: Student[] = [];

  async create({ class_id, user_id }: ICreateStudentDTO): Promise<Student> {
    const newStudent = new Student();

    Object.assign(newStudent, { class_id, user_id });

    this.students.push(newStudent);

    return newStudent;
  }

  async bulkCreate(students: ICreateStudentDTO[]): Promise<Student[]> {
    const newStudents = students.map(({ class_id, user_id }) => {
      const newStudent = new Student();

      Object.assign(newStudent, { class_id, user_id });

      this.students.push(newStudent);

      return newStudent;
    });

    this.students.push(...newStudents);

    return newStudents;
  }
}

export { StudentsRepositoryInMemory };
