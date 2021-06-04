import { Response, Request } from "express";
import { container } from "tsyringe";

import { FindClassInfoUseCase } from "./FindClassInfoUseCase";

class FindClassInfoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const class_id = request.params.id;

    const findClassInfo = container.resolve(FindClassInfoUseCase);

    const classInfo = await findClassInfo.execute({
      user_id,
      class_id,
    });

    return response.status(200).json(classInfo);
  }
}

export { FindClassInfoController };
