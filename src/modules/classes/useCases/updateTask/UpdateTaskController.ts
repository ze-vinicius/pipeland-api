import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateTaskUseCase } from "./UpdateTaskUseCase";

class UpdateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const {
      delivery_date,
      start_date,
      description,
      task_elements,
      title,
    } = request.body;

    const updateTask = container.resolve(UpdateTaskUseCase);

    const updatedTask = await updateTask.execute({
      logged_user_id: user_id,
      task: {
        id,
        delivery_date,
        start_date,
        description,
        task_elements,
        title,
      },
    });

    return response.status(200).json(updatedTask);
  }
}

export { UpdateTaskController };
