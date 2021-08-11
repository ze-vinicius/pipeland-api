import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

class DeleteTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const task_id = request.params.id;
    const logged_user_id = request.user.id;

    const deleteTask = container.resolve(DeleteTaskUseCase);

    await deleteTask.execute({
      logged_user_id,
      task_id,
    });

    return response.status(200).send();
  }
}

export { DeleteTaskController };
