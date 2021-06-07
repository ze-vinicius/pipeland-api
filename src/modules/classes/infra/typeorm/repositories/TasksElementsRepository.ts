import { getRepository, Repository } from "typeorm";

import { ICreateTaskElementDTO } from "@modules/classes/dtos/ICreateTaskElementDTO";
import { ITasksElementsRepository } from "@modules/classes/repositories/ITasksElementsRepository";

import { TaskElement } from "../entities/TaskElement";

class TasksElementsRepository implements ITasksElementsRepository {
  ormRepository: Repository<TaskElement>;

  constructor() {
    this.ormRepository = getRepository(TaskElement);
  }

  async create(data: ICreateTaskElementDTO): Promise<TaskElement> {
    const newTaskElement = this.ormRepository.create(data);

    await this.ormRepository.save(newTaskElement);

    return newTaskElement;
  }

  async bulkCreate(data: ICreateTaskElementDTO[]): Promise<TaskElement[]> {
    const newTasksElements = this.ormRepository.create(data);

    await this.ormRepository.save(newTasksElements);

    return newTasksElements;
  }

  async findAllByTaskId(task_id: string): Promise<TaskElement[]> {
    const findTasksElements = await this.ormRepository.find({
      where: { task_id },
    });

    return findTasksElements;
  }
}

export { TasksElementsRepository };
