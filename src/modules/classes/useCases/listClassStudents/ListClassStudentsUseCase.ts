import { inject, injectable } from "tsyringe";

import { IStudentResponseDTO } from "@modules/classes/dtos/IStudentResponseDTO";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { AppError } from "@shared/errors/AppError";
import { RESPONSE_ERRORS } from "@shared/utils";

import { StudentMap } from "../../mapper/StudentMap";

type IResponse = IStudentResponseDTO[];

@injectable()
class ListClassStudentsUseCase {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute({ class_id }: { class_id: string }): Promise<IResponse> {
    const findClass = await this.classesRepository.findById(class_id);

    if (!findClass) {
      throw new AppError(RESPONSE_ERRORS.CLASS_NOT_FOUND, 404);
    }

    const findStudents = await this.studentsRepository.findAllByClassId(
      class_id
    );

    const formatedStudents = findStudents.map((student) => {
      return StudentMap.toDTO(student);
    });

    return formatedStudents;
  }
}

export { ListClassStudentsUseCase };
