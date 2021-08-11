import { parseISO } from "date-fns";
import { inject, injectable } from "tsyringe";

import { ICreateTaskElementDTO } from "@modules/classes/dtos/ICreateTaskElementDTO";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IGameElementsRepository } from "@modules/classes/repositories/IGameElementsRepository";
import { ITasksElementsRepository } from "@modules/classes/repositories/ITasksElementsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";
import { GameElementType, utils } from "@shared/utils";

interface IRequest {
  logged_user_id: string;
  task: {
    id: string;
    title?: string;
    description?: string;
    delivery_date?: string;
    start_date?: string;
    class_id?: string;
    task_elements?: Array<{
      game_element_id: string;
      quantity: number;
    }>;
  };
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
class UpdateTaskUseCase {
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

  async execute({ logged_user_id, task }: IRequest): Promise<IResponse> {
    const findTask = await this.tasksRepository.findById(task.id);

    if (!findTask) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    const findClass = await this.classesRepository.findById(findTask.class_id);

    if (!findClass) {
      throw new AppError("Turma não encontrada!", 404);
    }

    if (findClass.teacher_id !== logged_user_id) {
      throw new AppError("Você não tem autorização para fazer isso", 401);
    }

    const formatedDeliveryDate = task.delivery_date
      ? parseISO(task.delivery_date)
      : undefined;

    const formatedStartDate = task.start_date
      ? parseISO(task.start_date)
      : undefined;

    const taskElements = task.task_elements;

    const taskElementsToCreate: Array<ICreateTaskElementDTO> = [];
    const taskElementsToDelete: Array<{ id: string }> = [];

    if (taskElements && !!taskElements.length) {
      findTask.task_elements.forEach((task_element) => {
        const findElement = taskElements.find(
          (el) => el.game_element_id === task_element.game_element_id
        );

        if (!findElement) {
          taskElementsToDelete.push({
            id: task_element.id,
          });
        }
      });

      taskElements.forEach((task_element) => {
        const findElement = findTask.task_elements.find(
          (el) => el.game_element_id === task_element.game_element_id
        );

        if (!findElement) {
          taskElementsToCreate.push({
            task_id: findTask.id,
            game_element_id: task_element.game_element_id,
            quantity: task_element.quantity,
          });
        }
      });
    }

    Object.assign(findTask, {
      title: task.title,
      description: task.description,
      start_date: formatedStartDate,
      delivery_date: formatedDeliveryDate,
    });

    await this.tasksRepository.save(findTask);

    if (taskElementsToDelete.length > 0) {
      await this.taskElementsRepository.bulkDelete(taskElementsToDelete);
    }

    if (taskElementsToCreate.length > 0) {
      await this.taskElementsRepository.bulkCreate(taskElementsToCreate);
    }

    const findTaskElements = await this.taskElementsRepository.findAllByTaskId(
      findTask.id
    );

    let task_value = 0;

    const formatedTaskElements = findTaskElements.map((taskElement) => {
      // const findElement = gameElements.find(
      //   (gameElement) => gameElement.id === taskElement.game_element_id
      // );

      task_value +=
        taskElement.game_element &&
        taskElement.game_element.type === "REWARD" &&
        taskElement.game_element.application === "FIXED_VALUE"
          ? taskElement.game_element.value
          : 0;

      return {
        id: taskElement.id,
        quantity: taskElement.quantity,
        name: taskElement.game_element?.name || "",
        imageUrl: taskElement.game_element?.imageUrl || "",
        type: taskElement.game_element?.type,
        game_element_id: taskElement.game_element?.id,
      };
    });

    return {
      ...findTask,
      create_date: findTask.start_date || findTask.created_at,
      task_value,
      status: utils.getTaskStatus(findTask.delivery_date),
      task_elements: formatedTaskElements,
    };
  }
}

export { UpdateTaskUseCase };
