import { Response, Request } from "express";
import { container } from "tsyringe";

import { CorrectTaskUseCase } from "./CorrectTaskUseCase";

class CorrectTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { student_id, coins, comment } = request.body;
    const task_id = request.params.id;

    const correctTask = container.resolve(CorrectTaskUseCase);

    const newCorrectedTask = await correctTask.execute({
      student_id,
      coins,
      comment,
      task_id,
    });

    return response.status(201).json(newCorrectedTask);
  }
}

export { CorrectTaskController };
