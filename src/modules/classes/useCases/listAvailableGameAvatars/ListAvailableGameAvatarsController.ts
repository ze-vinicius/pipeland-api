import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListAvailableGameAvatarsUseCase } from "./ListAvailableGameAvatarsUseCase";

class ListAvailableGameAvatarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAvailableGameAvatars = container.resolve(
      ListAvailableGameAvatarsUseCase
    );

    const gameAvatars = await listAvailableGameAvatars.execute();

    return response.status(200).json(gameAvatars);
  }
}

export { ListAvailableGameAvatarsController };
