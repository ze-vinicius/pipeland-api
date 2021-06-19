import { Response, Request } from "express";
import { container } from "tsyringe";

import { FindTaskDetailsUseCase } from "./FindTaskDetailsUseCase";

class FindTaskDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const findTaskDetails = container.resolve(FindTaskDetailsUseCase);

    const taskDetails = await findTaskDetails.execute({
      id,
      user_id,
    });

    return response.status(200).json(taskDetails);
  }
}

export { FindTaskDetailsController };
