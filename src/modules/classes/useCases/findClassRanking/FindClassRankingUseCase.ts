import { inject, injectable } from "tsyringe";

import { IAttendancesRepository } from "@modules/classes/repositories/IAttendancesRepository";
import {
  IStudentRanking,
  IStudentsRepository,
} from "@modules/classes/repositories/IStudentsRepository";
import { utils } from "@shared/utils";

interface IRequest {
  class_id: string;
}

@injectable()
class FindClassRankingUseCase {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,
    @inject("AttendancesRepository")
    private attendancesRepository: IAttendancesRepository
  ) {}

  public async execute({ class_id }: IRequest): Promise<IStudentRanking[]> {
    const studentsRanking = await this.studentsRepository.findClassRanking(
      class_id
    );

    const studentsAttendances = await this.attendancesRepository.findStudentsAttendancesCountByClassId(
      class_id
    );

    const formatStudentsRanking = studentsRanking
      .map((studentRanking) => {
        const findStudentAttendance = studentsAttendances.find(
          (student) => student.student_id === studentRanking.student_id
        );

        return {
          ...studentRanking,
          current_coins_qty:
            Number(studentRanking.current_coins_qty) +
            (findStudentAttendance
              ? Number(findStudentAttendance.attendance_count)
              : 0),
        };
      })
      .sort((a, b) => {
        return b.current_coins_qty - a.current_coins_qty;
      })
      .map((item, index) => ({
        ranking: index + 1,
        photo_url: utils.mountImageUrl(item.photo),
        ...item,
      }));

    return formatStudentsRanking;
  }
}

export { FindClassRankingUseCase };
