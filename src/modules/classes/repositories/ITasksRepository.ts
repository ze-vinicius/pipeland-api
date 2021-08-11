import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { Task } from "../infra/typeorm/entities/Task";

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;

  save(data: Task): Promise<Task>;
  delete(id: string): Promise<void>;

  findByClassIdAndTaskId({
    class_id,
    task_id,
  }: {
    class_id: string;
    task_id: string;
  }): Promise<Task | undefined>;

  findById(id: string): Promise<Task | undefined>;

  findAllByClassId(class_id: string): Promise<Task[]>;
}

export { ITasksRepository };
