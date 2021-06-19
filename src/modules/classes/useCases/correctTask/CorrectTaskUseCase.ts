import { inject, injectable } from "tsyringe";

// import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { TaskCorrection } from "@modules/classes/infra/typeorm/entities/TaskCorrection";
// import { IClassesInviteTokensRepository } from "@modules/classes/repositories/IClassesInviteTokensRepository";
// import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
// import { AppError } from "@shared/errors/AppError";

interface IRequest {
  task_id: string;
  student_id: string;
  coins: number;
  comment: string;
}

type IResponse = TaskCorrection;

@injectable()
class CorrectTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,
    @inject("TasksCorrectionsRepository")
    private tasksCorrectionsRepository: ITasksCorrectionsRepository
  ) {}

  public async execute({
    task_id,
    coins,
    student_id,
    comment,
  }: IRequest): Promise<IResponse> {
    const newTaskCorrection = await this.tasksCorrectionsRepository.create({
      earned_coins: coins,
      task_id,
      student_id,
      comment,
    });

    return newTaskCorrection;
  }
}

export { CorrectTaskUseCase };
