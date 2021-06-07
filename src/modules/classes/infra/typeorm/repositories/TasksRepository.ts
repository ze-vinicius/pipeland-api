import { getRepository, Repository } from "typeorm";

import { ICreateTaskDTO } from "@modules/classes/dtos/ICreateTaskDTO";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";

import { Task } from "../entities/Task";

class TasksRepository implements ITasksRepository {
  ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  async create(data: ICreateTaskDTO): Promise<Task> {
    const newTask = this.ormRepository.create(data);

    await this.ormRepository.save(newTask);

    return newTask;
  }

  async findById(id: string): Promise<Task | undefined> {
    const findTask = await this.ormRepository.findOne({
      where: { id },
    });

    return findTask;
  }

  async findAllByClassId(class_id: string): Promise<Task[]> {
    const findTasks = await this.ormRepository.find({
      where: { class_id },
      relations: ["class", "task_elements", "task_elements.game_element"],
    });

    return findTasks;
  }
}

export { TasksRepository };
