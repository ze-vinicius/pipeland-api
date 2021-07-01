import { ICreateTaskDTO } from "@modules/classes/dtos/ICreateTaskDTO";
import { Task } from "@modules/classes/infra/typeorm/entities/Task";

import { ITasksRepository } from "../ITasksRepository";

class TasksRepositoryInMemory implements ITasksRepository {
  private tasks: Task[] = [];

  async create(data: ICreateTaskDTO): Promise<Task> {
    const createdTask = new Task();

    Object.assign(createdTask, {
      ...data,
    });

    this.tasks.push(createdTask);

    return createdTask;
  }

  async findByClassIdAndTaskId({
    class_id,
    task_id,
  }: {
    class_id: string;
    task_id: string;
  }): Promise<Task | undefined> {
    return this.tasks.find(
      (task) => task.class_id === class_id && task.id === task_id
    );
  }

  async findById(id: string): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }

  async findAllByClassId(class_id: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.class_id === class_id);
  }
}

export { TasksRepositoryInMemory };
