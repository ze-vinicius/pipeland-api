import { inject, injectable } from "tsyringe";

import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { utils } from "@shared/utils";

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
        const task_value = utils.getTaskValue(task.task_elements);

        const formatedTaskElements = task.task_elements.map((task_element) => {
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
          create_date: task.start_date || task.created_at,
          task_value,
          task_elements: formatedTaskElements,
        };
      }
    );

    return formatTasks;
  }
}

export { ListClassTasksUseCase };
