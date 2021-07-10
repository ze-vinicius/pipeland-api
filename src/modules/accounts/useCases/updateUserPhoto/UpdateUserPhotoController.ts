import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateUserPhotoUseCase } from "./UpdateUserPhotoUseCase";

class UpdateUserPhotoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const photo = request.file?.filename;

    const updateUserPhotoUseCase = container.resolve(UpdateUserPhotoUseCase);

    await updateUserPhotoUseCase.execute({
      user_id,
      photo,
    });

    return response.status(204).send();
  }
}

export { UpdateUserPhotoController };
