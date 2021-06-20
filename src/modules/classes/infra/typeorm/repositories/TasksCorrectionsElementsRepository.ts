import { getRepository, Repository } from "typeorm";

import { ITasksCorrectionsElementsRepository } from "@modules/classes/repositories/ITasksCorrectionsElementsRepository";

import { TaskCorrectionElement } from "../entities/TaskCorrectionElement";

class TasksCorrectionsElementsRepository
  implements ITasksCorrectionsElementsRepository {
  ormRepository: Repository<TaskCorrectionElement>;

  constructor() {
    this.ormRepository = getRepository(TaskCorrectionElement);
  }

  async create(data: {
    task_correction_id: string;
    game_element_id: string;
  }): Promise<TaskCorrectionElement> {
    const newTaskCorrectionElement = this.ormRepository.create(data);

    await this.ormRepository.save(newTaskCorrectionElement);

    return newTaskCorrectionElement;
  }

  async bulkCreate(
    data: { task_correction_id: string; game_element_id: string }[]
  ): Promise<TaskCorrectionElement[]> {
    const newTasksCorrections = this.ormRepository.create(data);

    await this.ormRepository.save(newTasksCorrections);

    return newTasksCorrections;
  }

  findAllByTaskId(task_id: string): Promise<TaskCorrectionElement[]> {
    throw new Error("Method not implemented.");
  }
}

export { TasksCorrectionsElementsRepository };
