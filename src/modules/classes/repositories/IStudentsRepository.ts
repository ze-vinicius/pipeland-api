import { ICreateStudentDTO } from "../dtos/ICreateStudentDTO";
import { Student } from "../infra/typeorm/entities/Student";

interface IStudentsRepository {
  create(data: ICreateStudentDTO): Promise<Student>;

  bulkCreate(data: ICreateStudentDTO[]): Promise<Student[]>;
}

export { IStudentsRepository };
