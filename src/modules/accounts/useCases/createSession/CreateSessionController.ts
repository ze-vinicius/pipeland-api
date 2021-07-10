import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSessionUseCase } from "./CreateSessionUseCase";

class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    const { user, token } = await createSessionUseCase.execute({
      email,
      password,
    });

    return response.json({
      user,
      token,
    });
  }
}

export { CreateSessionController };
