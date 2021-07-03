import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const class_id = request.params.id;
    const {
      delivery_date,
      start_date,
      description,
      task_elements,
      title,
    } = request.body;

    const createTask = container.resolve(CreateTaskUseCase);

    const createdTask = await createTask.execute({
      class_id,
      delivery_date,
      start_date,
      description,
      task_elements,
      title,
    });

    return response.status(200).json(createdTask);
  }
}

export { CreateTaskController };
