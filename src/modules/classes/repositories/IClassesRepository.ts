import { ICreateClassDTO } from "../dtos/ICreateClassDTO";
import { Class } from "../infra/typeorm/entities/Class";

interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;
}

export { IClassesRepository };
