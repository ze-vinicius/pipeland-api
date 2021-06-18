import { Response, Request } from "express";
import { container } from "tsyringe";

import { JoinClassUseCase } from "./JoinClassUseCase";

class JoinClassController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { class_invite_token } = request.body;
    const user_id = request.user.id;

    const joinClass = container.resolve(JoinClassUseCase);

    const newStudent = await joinClass.execute({
      class_invite_token,
      user_id,
    });

    return response.status(200).json(newStudent);
  }
}

export { JoinClassController };
