import { TaskCorrection } from "@modules/classes/infra/typeorm/entities/TaskCorrection";

import { ITasksCorrectionsRepository } from "../ITasksCorrectionsRepository";

class TasksCorrectionsRepositoryInMemory
  implements ITasksCorrectionsRepository {
  private tasks_corrections: TaskCorrection[] = [];

  async create(data: {
    task_id: string;
    student_id: string;
    earned_coins: number;
    computed_coins: number;
    comment?: string | undefined;
    delivered_date?: string | undefined;
  }): Promise<TaskCorrection> {
    const createdTaskCorrection = new TaskCorrection();

    Object.assign(createdTaskCorrection, data);

    this.tasks_corrections.push(createdTaskCorrection);

    return createdTaskCorrection;
  }

  async findByTaskIdAndStudentId({
    student_id,
    task_id,
  }: {
    task_id: string;
    student_id: string;
  }): Promise<TaskCorrection | undefined> {
    return this.tasks_corrections.find(
      (task_correction) =>
        task_correction.task_id === task_id &&
        task_correction.student_id === student_id
    );
  }

  async findAllByTaskId({
    task_id,
  }: {
    task_id: string;
  }): Promise<TaskCorrection[]> {
    return this.tasks_corrections.filter(
      (task_correction) => task_correction.task_id === task_id
    );
  }

  async finAllByStudentId(student_id: string): Promise<TaskCorrection[]> {
    return this.tasks_corrections.filter(
      (task_correction) => task_correction.student_id === student_id
    );
  }
}

export { TasksCorrectionsRepositoryInMemory };
