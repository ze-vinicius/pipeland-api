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
    return this.ormRepository.find({ where: { class_id, date } });
  }
}

export { AttendancesRepository };
