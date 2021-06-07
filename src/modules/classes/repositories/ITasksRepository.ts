import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { Task } from "../infra/typeorm/entities/Task";

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;

  findById(id: string): Promise<Task | undefined>;

  findAllByClassId(class_id: string): Promise<Task[]>;
}

export { ITasksRepository };
