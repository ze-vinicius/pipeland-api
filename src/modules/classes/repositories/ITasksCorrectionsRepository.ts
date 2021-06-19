import { TaskCorrection } from "../infra/typeorm/entities/TaskCorrection";

interface ITasksCorrectionsRepository {
  create(data: {
    task_id: string;
    student_id: string;
    earned_coins: number;
    comment?: string;
  }): Promise<TaskCorrection>;

  findByTaskIdAndStudentId(data: {
    task_id: string;
    student_id: string;
  }): Promise<TaskCorrection | undefined>;

  finAllByStudentId(student_id: string): Promise<TaskCorrection[]>;
}

export { ITasksCorrectionsRepository };
