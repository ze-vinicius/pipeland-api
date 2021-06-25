import { parseISO } from "date-fns";
import { inject, injectable } from "tsyringe";

import { Task } from "@modules/classes/infra/typeorm/entities/Task";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IGameElementsRepository } from "@modules/classes/repositories/IGameElementsRepository";
import { ITasksElementsRepository } from "@modules/classes/repositories/ITasksElementsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";
import { utils } from "@shared/utils";

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

interface IResponse {
  id: string;
  title: string;
  status: string;
  delivery_date: Date;
  task_value: number;
  task_elements: Array<{
    id: string;
    quantity: number;
    name: string;
    imageUrl: string;
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
    private taskElementsRepository: ITasksElementsRepository,
    @inject("GameElementsRepository")
    private gameElementsRepository: IGameElementsRepository
  ) {}

  public async execute({
    class_id,
    delivery_date,
    description,
    title,
    task_elements,
  }: IRequest): Promise<IResponse> {
    const findClass = await this.classesRepository.findById(class_id);

    if (!findClass) {
      throw new AppError("Class was not found");
    }

    const formatedDeliveryDate = parseISO(delivery_date);

    const createdTask = await this.tasksRepository.create({
      delivery_date: formatedDeliveryDate,
      description,
      title,
      class_id,
    });

    const formatedCreateTaskElements = task_elements.map((task_element) => ({
      task_id: createdTask.id,
      game_element_id: task_element.game_element_id,
      quantity: task_element.quantity,
    }));

    const createdTaskElements = await this.taskElementsRepository.bulkCreate(
      formatedCreateTaskElements
    );

    const gameElements = await this.gameElementsRepository.findAll();

    let task_value = 0;

    const formatedTaskElements = createdTaskElements.map((taskElement) => {
      const findElement = gameElements.find(
        (gameElement) => gameElement.id === taskElement.game_element_id
      );

      task_value +=
        findElement && findElement.type === "REWARD" ? findElement.value : 0;

      return {
        id: taskElement.id,
        quantity: taskElement.quantity,
        name: findElement?.name || "",
        imageUrl: findElement?.imageUrl || "",
      };
    });

    return {
      ...createdTask,
      task_value,
      status: utils.getTaskStatus(createdTask.delivery_date),
      task_elements: formatedTaskElements,
    };
  }
}

export { CreateTaskUseCase };
