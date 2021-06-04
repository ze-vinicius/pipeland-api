import { ICreateStudentDTO } from "../dtos/ICreateStudentDTO";
import { IFindStudentsByIdAndClassIdDTO } from "../dtos/IFindStudentsByIdAndClassIdDTO";
import { Student } from "../infra/typeorm/entities/Student";

interface IStudentsRepository {
  create(data: ICreateStudentDTO): Promise<Student>;

  findByUserIdAndClassId(
    data: IFindStudentsByIdAndClassIdDTO
  ): Promise<Student | undefined>;

  bulkCreate(data: ICreateStudentDTO[]): Promise<Student[]>;

  findAllByUserId(user_id: string): Promise<Student[]>;
}

export { IStudentsRepository };
