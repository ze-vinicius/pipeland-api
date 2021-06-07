import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListClassTasksUseCase } from "./ListClassTasksUseCase";

class ListClassTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const class_id = request.params.id;

    const listClassTasks = container.resolve(ListClassTasksUseCase);

    const classTasks = await listClassTasks.execute({
      class_id,
    });

    return response.status(200).json(classTasks);
  }
}

export { ListClassTasksController };
