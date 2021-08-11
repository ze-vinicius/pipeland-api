import { parseISO } from "date-fns";
import { inject, injectable } from "tsyringe";

import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IGameElementsRepository } from "@modules/classes/repositories/IGameElementsRepository";
import { ITasksElementsRepository } from "@modules/classes/repositories/ITasksElementsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";
import { GameElementType, utils } from "@shared/utils";

interface IRequest {
  title: string;
  description: string;
  delivery_date: string;
  start_date?: string;
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
  start_date?: Date;
  create_date: Date;
  task_value: number;
  task_elements: Array<{
    id: string;
    quantity: number;
    name: string;
    imageUrl: string;
    game_element_id?: string;
    type?: GameElementType;
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
    start_date,
    description,
    title,
    task_elements,
  }: IRequest): Promise<IResponse> {
    const findClass = await this.classesRepository.findById(class_id);

    if (!findClass) {
      throw new AppError("Turma não encontrada", 404);
    }

    const formatedDeliveryDate = parseISO(delivery_date);
    const formatedStartDate = start_date ? parseISO(start_date) : undefined;

    const createdTask = await this.tasksRepository.create({
      delivery_date: formatedDeliveryDate,
      start_date: formatedStartDate,
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
        findElement &&
        findElement.type === "REWARD" &&
        findElement.application === "FIXED_VALUE"
          ? findElement.value
          : 0;

      return {
        id: taskElement.id,
        quantity: taskElement.quantity,
        name: findElement?.name || "",
        imageUrl: findElement?.imageUrl || "",
        type: findElement?.type,
        game_element_id: findElement?.id,
      };
    });

    return {
      ...createdTask,
      create_date: createdTask.start_date || createdTask.created_at,
      task_value,
      status: utils.getTaskStatus(createdTask.delivery_date),
      task_elements: formatedTaskElements,
    };
  }
}

export { CreateTaskUseCase };
