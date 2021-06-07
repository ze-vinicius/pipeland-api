import { inject, injectable } from "tsyringe";

import { Task } from "@modules/classes/infra/typeorm/entities/Task";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { ITasksElementsRepository } from "@modules/classes/repositories/ITasksElementsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  title: string;
  description: string;
  delivery_date: string;
  class_id: string;
  task_elements: Array<{
    game_element_id: string;
    quantity: number;
  }>;
}

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
    @inject("TasksElementsRepository")
    private taskElementsRepository: ITasksElementsRepository
  ) {}

  public async execute({
    class_id,
    delivery_date,
    description,
    title,
    task_elements,
  }: IRequest): Promise<Task> {
    const findClass = await this.classesRepository.findById(class_id);

    if (!findClass) {
      throw new AppError("Class was not found");
    }

    const createdTask = await this.tasksRepository.create({
      delivery_date,
      description,
      title,
      class_id,
    });

    const formatedTaskElements = task_elements.map((task_element) => ({
      task_id: createdTask.id,
      game_element_id: task_element.game_element_id,
      quantity: task_element.quantity,
    }));

    const createdTaskElements = await this.taskElementsRepository.bulkCreate(
      formatedTaskElements
    );

    return {
      ...createdTask,
      task_elements: createdTaskElements,
    };
  }
}

export { CreateTaskUseCase };
