import { inject, injectable } from "tsyringe";

import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  logged_user_id: string;
  task_id: string;
}

@injectable()
class DeleteTaskUseCase {
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
    @inject("TasksCorrectionsRepository")
    private tasksCorrectionsRepository: ITasksCorrectionsRepository
  ) {}

  async execute({ logged_user_id, task_id }: IRequest): Promise<void> {
    const findTask = await this.tasksRepository.findById(task_id);

    if (!findTask) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    const findClass = await this.classesRepository.findById(findTask.class_id);

    if (!findClass) {
      throw new AppError("Turma não encontrada!", 404);
    }

    if (findClass.teacher_id !== logged_user_id) {
      throw new AppError("Você não tem autorização para fazer isso", 401);
    }

    await this.tasksRepository.delete(task_id);

    await this.tasksCorrectionsRepository.deleteAllByTaskId(task_id);
  }
}

export { DeleteTaskUseCase };
