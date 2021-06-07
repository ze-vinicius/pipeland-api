import { inject, injectable } from "tsyringe";

import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
// import { AppError } from "@shared/errors/AppError";

interface IRequest {
  class_id: string;
}

type IResponse = Array<{
  id: string;
  title: string;
  description: string;
  delivery_date: Date;
  create_date: Date;
  task_value: number;
  task_elements: {
    id: string;
    name: string;
    quantity: number;
  }[];
}>;

@injectable()
class ListClassTasksUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  public async execute({ class_id }: IRequest): Promise<IResponse> {
    const findTasks = await this.tasksRepository.findAllByClassId(class_id);
    let task_value = 0;

    const formatTasks = findTasks.map((task) => {
      const formatedTaskElements = task.task_elements.map((task_element) => {
        task_value +=
          task_element.game_element.type === "REWARD"
            ? task_element.quantity * task_element.game_element.value
            : 0;

        return {
          id: task_element.id,
          name: task_element.game_element.name,
          quantity: task_element.quantity,
          imageUrl: task_element.game_element.imageUrl,
        };
      });

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        delivery_date: task.delivery_date,
        create_date: task.created_at,
        task_value,
        task_elements: formatedTaskElements,
      };
    });

    return formatTasks;
  }
}

export { ListClassTasksUseCase };
