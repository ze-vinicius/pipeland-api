import { TaskCorrection } from "../infra/typeorm/entities/TaskCorrection";

interface ITasksCorrectionsRepository {
  create(data: {
    task_id: string;
    student_id: string;
    earned_coins: number;
    computed_coins: number;
    comment?: string;
    delivered_date?: string;
  }): Promise<TaskCorrection>;

  findByTaskIdAndStudentId(data: {
    task_id: string;
    student_id: string;
  }): Promise<TaskCorrection | undefined>;

  findAllByTaskId(data: { task_id: string }): Promise<TaskCorrection[]>;

  finAllByStudentId(student_id: string): Promise<TaskCorrection[]>;
}

export { ITasksCorrectionsRepository };
