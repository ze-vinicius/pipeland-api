import { TaskCorrectionElement } from "@modules/classes/infra/typeorm/entities/TaskCorrectionElement";

import { ITasksCorrectionsElementsRepository } from "../ITasksCorrectionsElementsRepository";

class TasksCorrectionsElementsRepositoryInMemory
  implements ITasksCorrectionsElementsRepository {
  private tasks_corrections_elements: TaskCorrectionElement[] = [];

  async create(data: {
    task_correction_id: string;
    game_element_id: string;
  }): Promise<TaskCorrectionElement> {
    const createdTaskCorrectionElement = new TaskCorrectionElement();

    Object.assign(createdTaskCorrectionElement, data);

    this.tasks_corrections_elements.push(createdTaskCorrectionElement);

    return createdTaskCorrectionElement;
  }

  async bulkCreate(
    data: { task_correction_id: string; game_element_id: string }[]
  ): Promise<TaskCorrectionElement[]> {
    return data.map((item) => {
      const createdTaskCorrectionElement = new TaskCorrectionElement();

      Object.assign(createdTaskCorrectionElement, item);

      this.tasks_corrections_elements.push(createdTaskCorrectionElement);

      return createdTaskCorrectionElement;
    });
  }
}

export { TasksCorrectionsElementsRepositoryInMemory };
