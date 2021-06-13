import { Response, Request } from "express";
import { container } from "tsyringe";

import { FindTaskDetailsUseCase } from "./FindTaskDetailsUseCase";

class FindTaskDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { class_id, task_id } = request.params;

    const findTaskDetails = container.resolve(FindTaskDetailsUseCase);

    const taskDetails = await findTaskDetails.execute({
      class_id,
      task_id,
    });

    return response.status(200).json(taskDetails);
  }
}

export { FindTaskDetailsController };
