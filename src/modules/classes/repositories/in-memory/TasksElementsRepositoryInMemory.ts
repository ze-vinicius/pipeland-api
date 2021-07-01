import { ICreateTaskElementDTO } from "@modules/classes/dtos/ICreateTaskElementDTO";
import { TaskElement } from "@modules/classes/infra/typeorm/entities/TaskElement";

import { ITasksElementsRepository } from "../ITasksElementsRepository";

class TasksElementsRepositoryInMemory implements ITasksElementsRepository {
  private tasks_elements_repository: TaskElement[] = [];

  async create(data: ICreateTaskElementDTO): Promise<TaskElement> {
    const createdTaskElement = new TaskElement();

    Object.assign(createdTaskElement, data);

    this.tasks_elements_repository.push(createdTaskElement);

    return createdTaskElement;
  }

  async bulkCreate(data: ICreateTaskElementDTO[]): Promise<TaskElement[]> {
    return data.map((item) => {
      const createdTaskElement = new TaskElement();

      Object.assign(createdTaskElement, item);

      this.tasks_elements_repository.push(createdTaskElement);

      return createdTaskElement;
    });
  }

  async findAllByTaskId(task_id: string): Promise<TaskElement[]> {
    return this.tasks_elements_repository.filter(
      (item) => item.task_id === task_id
    );
  }
}

export { TasksElementsRepositoryInMemory };
