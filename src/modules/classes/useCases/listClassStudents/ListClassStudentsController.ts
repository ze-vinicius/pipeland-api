import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListClassStudentsUseCase } from "./ListClassStudentsUseCase";

class ListClassStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const class_id = request.params.id;

    const listClassStudents = container.resolve(ListClassStudentsUseCase);

    const classStudents = await listClassStudents.execute({
      class_id,
    });

    return response.status(200).json(classStudents);
  }
}

export { ListClassStudentsController };
