import { getRepository, Repository } from "typeorm";

import { ICreateStudentDTO } from "@modules/classes/dtos/ICreateStudentDTO";
import { IFindStudentsByIdAndClassIdDTO } from "@modules/classes/dtos/IFindStudentsByIdAndClassIdDTO";
import {
  IStudentRanking,
  IStudentsRepository,
} from "@modules/classes/repositories/IStudentsRepository";

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
      relations: ["class", "class.teacher", "user"],
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
      relations: ["class", "class.teacher", "user"],
      where: {
        user_id,
      },
    });

    return findStudents;
  }

  async findClassRanking(class_id: string): Promise<Array<IStudentRanking>> {
    const studentsRanking: IStudentRanking[] = await this.ormRepository.manager
      .query(`
        select 
          s.id as student_id, 
          u."name", 
          u.id as user_id, 
          u.nickname, 
          u.photo, 
          coalesce(sum(tc.computed_coins), 0) as current_coins_qty
        from students as s 
        left join tasks_corrections as tc 
        on s.id = tc.student_id 
        left join users as u
        on s.user_id = u.id
        where s.class_id = '${class_id}'
        group by s.id, u.id
      `);

    return studentsRanking;
  }

  findAllByClassId(class_id: string): Promise<Student[]> {
    return this.ormRepository.find({
      where: { class_id },
      relations: ["user"],
    });
  }
}

export { StudentsRepository };
