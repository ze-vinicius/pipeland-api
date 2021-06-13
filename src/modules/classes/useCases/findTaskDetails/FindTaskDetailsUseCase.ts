import { inject, injectable } from "tsyringe";

import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";
// import { AppError } from "@shared/errors/AppError";

interface IRequest {
  class_id: string;
  task_id: string;
}

type IResponse = {
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
};

@injectable()
class FindTaskDetailsUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  public async execute({ class_id, task_id }: IRequest): Promise<IResponse> {
    const findTask = await this.tasksRepository.findByClassIdAndTaskId({
      task_id,
      class_id,
    });

    if (!findTask) {
      throw new AppError("Task was not found");
    }

    let task_value = 0;

    const formatedTaskElements = findTask.task_elements.map((task_element) => {
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

    const formatTask = {
      id: findTask.id,
      title: findTask.title,
      description: findTask.description,
      delivery_date: findTask.delivery_date,
      create_date: findTask.created_at,
      task_value,
      task_elements: formatedTaskElements,
    };

    return formatTask;
  }
}

export { FindTaskDetailsUseCase };
