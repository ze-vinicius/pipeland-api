import { Response, Request } from "express";
import { container } from "tsyringe";

import { FindClassRankingUseCase } from "./FindClassRankingUseCase";

class FindClassRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const class_id = request.params.id;

    const findClassRanking = container.resolve(FindClassRankingUseCase);

    const classRanking = await findClassRanking.execute({
      class_id,
    });

    return response.status(200).json(classRanking);
  }
}

export { FindClassRankingController };
