import { ICreateTaskElementDTO } from "../dtos/ICreateTaskElementDTO";
import { TaskElement } from "../infra/typeorm/entities/TaskElement";

interface ITasksElementsRepository {
  create(data: ICreateTaskElementDTO): Promise<TaskElement>;

  bulkCreate(data: ICreateTaskElementDTO[]): Promise<TaskElement[]>;

  findAllByTaskId(task_id: string): Promise<TaskElement[]>;
}

export { ITasksElementsRepository };
