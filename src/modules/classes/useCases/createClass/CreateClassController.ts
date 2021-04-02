import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateClassUseCase } from "./CreateClassUseCase";

class CreateClassController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const teacher_id = request.user.id;

    const createClassUseCase = container.resolve(CreateClassUseCase);

    const createdClass = await createClassUseCase.execute({
      name,
      teacher_id,
    });

    return response.status(201).json(createdClass);
  }
}

export { CreateClassController };
