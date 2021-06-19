import { getRepository, Repository } from "typeorm";

import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";

import { TaskCorrection } from "../entities/TaskCorrection";

class TasksCorrectionsRepository implements ITasksCorrectionsRepository {
  ormRepository: Repository<TaskCorrection>;

  constructor() {
    this.ormRepository = getRepository(TaskCorrection);
  }

  async create(data: {
    task_id: string;
    student_id: string;
    earned_coins: number;
    comment?: string;
  }): Promise<TaskCorrection> {
    const newTaskCorrection = this.ormRepository.create(data);

    this.ormRepository.save(newTaskCorrection);

    return newTaskCorrection;
  }

  async findByTaskIdAndStudentId({
    task_id,
    student_id,
  }: {
    task_id: string;
    student_id: string;
  }): Promise<TaskCorrection | undefined> {
    return this.ormRepository.findOne({
      where: {
        task_id,
        student_id,
      },
    });
  }

  async finAllByStudentId(student_id: string): Promise<TaskCorrection[]> {
    return this.ormRepository.find({
      where: { student_id },
    });
  }
}

export { TasksCorrectionsRepository };
