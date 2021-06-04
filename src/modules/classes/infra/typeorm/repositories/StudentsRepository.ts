import { getRepository, Repository } from "typeorm";

import { ICreateStudentDTO } from "@modules/classes/dtos/ICreateStudentDTO";
import { IFindStudentsByIdAndClassIdDTO } from "@modules/classes/dtos/IFindStudentsByIdAndClassIdDTO";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";

import { Student } from "../entities/Student";

class StudentsRepository implements IStudentsRepository {
  ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  async create(data: ICreateStudentDTO): Promise<Student> {
    const newStudent = this.ormRepository.create(data);

    this.ormRepository.save(newStudent);

    return newStudent;
  }
  async findByUserIdAndClassId({
    class_id,
    user_id,
  }: IFindStudentsByIdAndClassIdDTO): Promise<Student | undefined> {
    const findStudent = await this.ormRepository.findOne({
      where: {
        user_id,
        class_id,
      },
    });

    return findStudent;
  }

  async bulkCreate(data: ICreateStudentDTO[]): Promise<Student[]> {
    const newStudents = this.ormRepository.create(data);

    this.ormRepository.save(newStudents);

    return newStudents;
  }

  async findAllByUserId(user_id: string): Promise<Student[]> {
    const findStudents = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return findStudents;
  }
}

export { StudentsRepository };
