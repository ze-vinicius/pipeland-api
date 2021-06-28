import { ICreateStudentDTO } from "../dtos/ICreateStudentDTO";
import { IFindStudentsByIdAndClassIdDTO } from "../dtos/IFindStudentsByIdAndClassIdDTO";
import { Student } from "../infra/typeorm/entities/Student";

export interface IStudentRanking {
  student_id: string;
  name: string;
  user_id: string;
  nickname: string;
  photo: string;
  current_coins_qty: number;
}

interface IStudentsRepository {
  create(data: ICreateStudentDTO): Promise<Student>;

  findByUserIdAndClassId(
    data: IFindStudentsByIdAndClassIdDTO
  ): Promise<Student | undefined>;

  bulkCreate(data: ICreateStudentDTO[]): Promise<Student[]>;

  findAllByUserId(user_id: string): Promise<Student[]>;

  findClassRanking(class_id: string): Promise<Array<IStudentRanking>>;

  findAllByClassId(class_id: string): Promise<Student[]>;
}

export { IStudentsRepository };
