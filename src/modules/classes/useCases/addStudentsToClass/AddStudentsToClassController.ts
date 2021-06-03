import { Response, Request } from "express";
import { container } from "tsyringe";

import { AddStudentsToClassUseCase } from "./AddStudentsToClassUseCase";

class AddStudentsToClassController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { students } = request.body;
    const class_id = request.params.id;
    const teacher_id = request.user.id;

    const addStudentsToClass = container.resolve(AddStudentsToClassUseCase);

    const newStudents = await addStudentsToClass.execute({
      teacher_id,
      class_id,
      students,
    });

    return response.status(200).json(newStudents);
  }
}

export { AddStudentsToClassController };
