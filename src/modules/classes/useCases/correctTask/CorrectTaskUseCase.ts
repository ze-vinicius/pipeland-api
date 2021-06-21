import { differenceInDays } from "date-fns";
import { inject, injectable } from "tsyringe";

// import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { TaskCorrection } from "@modules/classes/infra/typeorm/entities/TaskCorrection";
// import { IClassesInviteTokensRepository } from "@modules/classes/repositories/IClassesInviteTokensRepository";
// import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
// import { TaskCorrectionElement } from "@modules/classes/infra/typeorm/entities/TaskCorrectionElement";
// import { IStudentsRepository } from "@modules/classes/repositories/IStudentsRepository";
import { ITasksCorrectionsElementsRepository } from "@modules/classes/repositories/ITasksCorrectionsElementsRepository";
import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";
// import { AppError } from "@shared/errors/AppError";

interface IRequest {
  task_id: string;
  student_id: string;
  coins: number;
  comment: string;
  delivered_date: string;
  gotShell: boolean;
}

type IResponse = TaskCorrection;

@injectable()
class CorrectTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
    // @inject("StudentsRepository")
    // private studentsRepository: IStudentsRepository,
    @inject("TasksCorrectionsRepository")
    private tasksCorrectionsRepository: ITasksCorrectionsRepository,
    @inject("TasksCorrectionsElementsRepository")
    private tasksCorrectionsElementsRepository: ITasksCorrectionsElementsRepository
  ) {}

  public async execute({
    task_id,
    coins,
    student_id,
    comment,
    delivered_date,
    gotShell,
  }: IRequest): Promise<IResponse> {
    const findTask = await this.tasksRepository.findById(task_id);

    if (!findTask) {
      throw new AppError("Tarefa não encontrada!");
    }

    let earnedCoins = coins;

    let taskValue = 0;

    const coinsAccuracy = (earnedCoins / taskValue) * 100;

    let piranhaPlantId = "";
    let pipeId = "";
    let yoshiId = "";
    let bombId = "";
    let shellId = "";

    const appliedElements: string[] = [];

    findTask.task_elements.forEach((task_element) => {
      taskValue +=
        task_element.game_element.type === "REWARD"
          ? task_element.quantity * task_element.game_element.value
          : 0;

      if (task_element.game_element.name === "piranha plant") {
        piranhaPlantId = task_element.game_element_id;
      }

      if (task_element.game_element.name === "pipe") {
        pipeId = task_element.game_element_id;
      }

      if (task_element.game_element.name === "yoshi") {
        yoshiId = task_element.game_element_id;
      }

      if (task_element.game_element.name === "bomb") {
        bombId = task_element.game_element_id;
      }

      if (task_element.game_element.name === "shell") {
        shellId = task_element.game_element_id;
      }
    });

    if (!!piranhaPlantId && !delivered_date && earnedCoins === 0) {
      earnedCoins -= taskValue * 0.5;
      appliedElements.push(piranhaPlantId);
    }

    if (!!yoshiId && coinsAccuracy >= 80) {
      earnedCoins -= taskValue * 0.5;
      appliedElements.push(yoshiId);
    }

    if (
      !!pipeId &&
      differenceInDays(findTask.delivery_date, new Date(delivered_date)) >= 2
    ) {
      earnedCoins += taskValue * 0.1;
      appliedElements.push(pipeId);
    }

    if (gotShell && !!shellId) {
      earnedCoins -= 1;
      appliedElements.push(shellId);
    }

    if (!!bombId && coinsAccuracy <= 30) {
      earnedCoins -= taskValue * 0.3;
      appliedElements.push(bombId);
    }

    const newTaskCorrection = await this.tasksCorrectionsRepository.create({
      earned_coins: earnedCoins,
      task_id,
      student_id,
      comment,
    });

    const formatedTaskCorrectionElement = appliedElements.map((element) => ({
      game_element_id: element,
      task_correction_id: newTaskCorrection.id,
    }));

    await this.tasksCorrectionsElementsRepository.bulkCreate(
      formatedTaskCorrectionElement
    );

    return newTaskCorrection;
  }
}

export { CorrectTaskUseCase };
