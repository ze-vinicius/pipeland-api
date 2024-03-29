import { ICreateStudentDTO } from "@modules/classes/dtos/ICreateStudentDTO";
import { IFindStudentsByIdAndClassIdDTO } from "@modules/classes/dtos/IFindStudentsByIdAndClassIdDTO";
import { Student } from "@modules/classes/infra/typeorm/entities/Student";

import { IStudentRanking, IStudentsRepository } from "../IStudentsRepository";

class StudentsRepositoryInMemory implements IStudentsRepository {
  findClassRanking(class_id: string): Promise<IStudentRanking[]> {
    throw new Error("Method not implemented.");
  }
  findAllByClassId(class_id: string): Promise<Student[]> {
    throw new Error("Method not implemented.");
  }
  private students: Student[] = [];

  async create(student: ICreateStudentDTO): Promise<Student> {
    const newStudent = new Student();

    Object.assign(newStudent, {
      class_id: student.class_id,
      class: student.class,
      user_id: student.user_id,
    });

    this.students.push(newStudent);

    return newStudent;
  }

  async bulkCreate(students: ICreateStudentDTO[]): Promise<Student[]> {
    const newStudents = students.map((student) => {
      const newStudent = new Student();

      Object.assign(newStudent, {
        class_id: student.class_id,
        class: student.class,
        user_id: student.user_id,
      });

      this.students.push(newStudent);

      return newStudent;
    });

    this.students.push(...newStudents);

    return newStudents;
  }

  async findAllByUserId(user_id: string): Promise<Student[]> {
    const findStudents = this.students.filter(
      (student) => student.user_id === user_id
    );

    return findStudents;
  }

  async findByUserIdAndClassId({
    user_id,
    class_id,
  }: IFindStudentsByIdAndClassIdDTO): Promise<Student | undefined> {
    return this.students.find(
      (student) => student.user_id === user_id && student.class_id === class_id
    );
  }
}

export { StudentsRepositoryInMemory };
