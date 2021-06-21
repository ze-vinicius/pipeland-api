import { Attendance } from "../infra/typeorm/entities/Attendance";

export interface ICreateAttendanceDTO {
  class_id: string;
  student_id: string;
  is_present: boolean;
  date: string;
}

interface IAttendancesRepository {
  bulkCreate(data: ICreateAttendanceDTO[]): Promise<Attendance[]>;

  findAllByClassIdAndDate(data: {
    class_id: string;
    date: string;
  }): Promise<Attendance[]>;
}

export { IAttendancesRepository };
