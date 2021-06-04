import { ICreateClassDTO } from "../dtos/ICreateClassDTO";
import { Class } from "../infra/typeorm/entities/Class";

interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;

  findById(class_id: string): Promise<Class | undefined>;

  findAllByTeacherId(teacher_id: string): Promise<Class[]>;
}

export { IClassesRepository };
