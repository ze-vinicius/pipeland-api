import { ICreateClassDTO } from "../dtos/ICreateClassDTO";
import { IFindClassByIdAndTeacherId } from "../dtos/IFindClassByIdAndTeacherIdDTO";
import { Class } from "../infra/typeorm/entities/Class";

interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;

  findByIdAndTeacherId(
    data: IFindClassByIdAndTeacherId
  ): Promise<Class | undefined>;
}

export { IClassesRepository };
