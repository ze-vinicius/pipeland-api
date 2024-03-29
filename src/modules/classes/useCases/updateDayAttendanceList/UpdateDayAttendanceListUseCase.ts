import { startOfDay } from "date-fns";
import { inject, injectable } from "tsyringe";

import { Attendance } from "@modules/classes/infra/typeorm/entities/Attendance";
import { IAttendancesRepository } from "@modules/classes/repositories/IAttendancesRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  logged_user_id: string;
  date: string;
  class_id: string;
  students: Array<{ student_id: string; is_present: boolean }>;
}

@injectable()
class UpdateDayAttendanceListUseCase {
  constructor(
    @inject("AttendancesRepository")
    private attendancesRepository: IAttendancesRepository,
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  async execute({
    logged_user_id,
    class_id,
    date,
    students,
  }: IRequest): Promise<Attendance[]> {
    const findClass = await this.classesRepository.findById(class_id);

    if (!findClass) {
      throw new AppError("Turma não encontrada!", 404);
    }

    if (findClass.teacher_id !== logged_user_id) {
      throw new AppError("Você não tem autorização para fazer isso", 401);
    }

    const formatedDate = startOfDay(new Date(date));

    const findAttendances = await this.attendancesRepository.findAllByClassIdAndDate(
      {
        class_id,
        date: formatedDate,
      }
    );

    if (findAttendances.length) {
      const formattedAttendances = findAttendances.map((attendance) => {
        const findAttendance = students.find(
          (student) => student.student_id === attendance.student_id
        );

        return {
          ...attendance,
          is_present: findAttendance?.is_present ?? false,
        };
      });

      const updatedAttendances = await this.attendancesRepository.saveAll(
        formattedAttendances
      );

      return updatedAttendances;
    }

    const formatedAttendance = students.map((student) => ({
      student_id: student.student_id,
      is_present: student.is_present,
      class_id,
      date: formatedDate,
    }));

    const newAttendances = await this.attendancesRepository.bulkCreate(
      formatedAttendance
    );

    return newAttendances;
  }
}

export { UpdateDayAttendanceListUseCase };
