import { Attendance } from "../infra/typeorm/entities/Attendance";

export interface ICreateAttendanceDTO {
  class_id: string;
  student_id: string;
  is_present: boolean;
  date: string | Date;
}

interface IAttendancesRepository {
  bulkCreate(data: ICreateAttendanceDTO[]): Promise<Attendance[]>;

  save(data: Attendance): Promise<Attendance>;

  saveAll(data: Attendance[]): Promise<Attendance[]>;

  findAllByClassIdAndDate(data: {
    class_id: string;
    date: string | Date;
  }): Promise<Attendance[]>;
}

export { IAttendancesRepository };
