import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListGameElementsUseCase } from "./ListGameElementsUseCase";

class ListGameElementsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listGameElements = container.resolve(ListGameElementsUseCase);

    const gameElements = await listGameElements.execute();

    return response.status(200).json(gameElements);
  }
}

export { ListGameElementsController };
