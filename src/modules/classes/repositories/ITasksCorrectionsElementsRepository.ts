import { TaskCorrectionElement } from "../infra/typeorm/entities/TaskCorrectionElement";

interface ITasksCorrectionsElementsRepository {
  create(data: {
    task_correction_id: string;
    game_element_id: string;
  }): Promise<TaskCorrectionElement>;

  bulkCreate(
    data: Array<{
      task_correction_id: string;
      game_element_id: string;
    }>
  ): Promise<TaskCorrectionElement[]>;
}

export { ITasksCorrectionsElementsRepository };
