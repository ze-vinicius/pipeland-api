import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListUserClassesUseCase } from "./ListUserClassesUseCase";

class ListUserClassesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserClasses = container.resolve(ListUserClassesUseCase);

    const userClasses = await listUserClasses.execute({
      user_id,
    });

    return response.status(200).json(userClasses);
  }
}

export { ListUserClassesController };
