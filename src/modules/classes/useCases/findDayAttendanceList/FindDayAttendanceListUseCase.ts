import { inject, injectable } from "tsyringe";

import { Attendance } from "@modules/classes/infra/typeorm/entities/Attendance";
import { IAttendancesRepository } from "@modules/classes/repositories/IAttendancesRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  logged_user_id: string;
  date: string;
  class_id: string;
}

@injectable()
class FindDayAttendanceListUseCase {
  constructor(
    @inject("AttendancesRepository")
    private attendancesRepository: IAttendancesRepository,
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository
  ) {}

  async execute({
    logged_user_id,
    class_id,
    date,
  }: IRequest): Promise<Attendance[]> {
    const findClass = await this.classesRepository.findById(class_id);

    if (!findClass) {
      throw new AppError("Turma não encontrada!", 404);
    }

    const findStudent = await this.studentsRepository.findByUserIdAndClassId({
      class_id,
      user_id: logged_user_id,
    });

    if (findClass.teacher_id !== logged_user_id && !findStudent) {
      throw new AppError("Você não tem autorização para fazer isso", 401);
    }

    const findAttendances = await this.attendancesRepository.findAllByClassIdAndDate(
      {
        class_id,
        date,
      }
    );

    return findAttendances;
  }
}

export { FindDayAttendanceListUseCase };
