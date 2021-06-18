import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetSessionInfoUseCase } from "./GetSessionInfoUseCase";

class GetSessionInfoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getSessionInfo = container.resolve(GetSessionInfoUseCase);

    const user = await getSessionInfo.execute({
      user_id,
    });

    user.password = "";

    return response.json(user);
  }
}

export { GetSessionInfoController };
