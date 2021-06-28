import { getRepository, Repository } from "typeorm";

import {
  IAttendancesRepository,
  ICreateAttendanceDTO,
} from "@modules/classes/repositories/IAttendancesRepository";

import { Attendance } from "../entities/Attendance";

class AttendancesRepository implements IAttendancesRepository {
  private ormRepository: Repository<Attendance>;

  constructor() {
    this.ormRepository = getRepository(Attendance);
  }

  async bulkCreate(data: ICreateAttendanceDTO[]): Promise<Attendance[]> {
    const newAttendances = this.ormRepository.create(data);

    this.ormRepository.save(newAttendances);

    return newAttendances;
  }

  findAllByClassIdAndDate({
    class_id,
    date,
  }: {
    class_id: string;
    date: string;
  }): Promise<Attendance[]> {
    return this.ormRepository.find({
      where: { class_id, date },
      relations: ["student", "student.user"],
    });
  }

  async save(data: Attendance): Promise<Attendance> {
    return this.ormRepository.save(data);
  }

  async saveAll(data: Attendance[]): Promise<Attendance[]> {
    return this.ormRepository.save(data);
  }

  findStudentsAttendancesCountByClassId(
    class_id: string
  ): Promise<{ student_id: string; attendance_count: number }[]> {
    return this.ormRepository.manager.query(`
      select a.student_id, count(a.student_id) as attendance_count 
      from attendances a 
      where a.is_present = true 
      and a.class_id = '${class_id}' 
      group by a.student_id;
    `);
  }

  findStudentAttendancesCountByStudentIdAndClassId({
    student_id,
    class_id,
  }: {
    class_id: string;
    student_id: string;
  }): Promise<{ student_id: string; attendance_count: number }[]> {
    return this.ormRepository.manager.query(`
      select a.student_id, coalesce(count(a.student_id), 0) as attendance_count 
      from attendances a 
      where a.is_present = true 
      and a.class_id = '${class_id}' 
      and a.student_id = '${student_id}'
      group by a.student_id;
    `);
  }
}

export { AttendancesRepository };
