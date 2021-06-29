import { inject, injectable } from "tsyringe";

import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { utils } from "@shared/utils";
// import { AppError } from "@shared/errors/AppError";

interface IRequest {
  class_id: string;
}

interface ITaskResume {
  id: string;
  title: string;
  status: "OPEN" | "CLOSED" | "CORRECTED";
  delivery_date: Date;
  create_date: Date;
  task_value: number;
  task_elements: Array<{
    id: string;
    name: string;
    imageUrl: string;
    quantity: number;
  }>;
}

type IResponse = Array<ITaskResume>;

@injectable()
class ListClassTasksUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  public async execute({ class_id }: IRequest): Promise<IResponse> {
    const findTasks = await this.tasksRepository.findAllByClassId(class_id);

    const formatTasks = findTasks.map(
      (task): ITaskResume => {
        let task_value = 0;

        const formatedTaskElements = task.task_elements.map((task_element) => {
          task_value +=
            task_element.game_element.type === "REWARD"
              ? task_element.quantity * task_element.game_element.value
              : 0;

          return {
            id: task_element.id,
            name: task_element.game_element.name,
            imageUrl: task_element.game_element.imageUrl,
            quantity: task_element.quantity,
          };
        });

        return {
          id: task.id,
          title: task.title,
          status: utils.getTaskStatus(task.delivery_date),
          delivery_date: task.delivery_date,
          create_date: task.created_at,
          task_value,
          task_elements: formatedTaskElements,
        };
      }
    );

    return formatTasks;
  }
}

export { ListClassTasksUseCase };
