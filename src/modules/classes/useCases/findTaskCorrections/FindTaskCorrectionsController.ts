import { Response, Request } from "express";
import { container } from "tsyringe";

import { FindTaskCorrectionsUseCase } from "./FindTaskCorrectionsUseCase";

class FindTaskCorrectionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const findTaskCorrections = container.resolve(FindTaskCorrectionsUseCase);

    const taskCorrections = await findTaskCorrections.execute({
      task_id: id,
      user_id,
    });

    return response.status(200).json(taskCorrections);
  }
}

export { FindTaskCorrectionsController };
