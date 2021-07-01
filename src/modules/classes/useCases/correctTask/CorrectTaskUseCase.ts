import { differenceInDays } from "date-fns";
import { inject, injectable } from "tsyringe";

import { TaskCorrection } from "@modules/classes/infra/typeorm/entities/TaskCorrection";
import { ITasksCorrectionsElementsRepository } from "@modules/classes/repositories/ITasksCorrectionsElementsRepository";
import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  task_id: string;
  student_id: string;
  coins: number;
  comment: string;
  delivered_date: string;
  got_shell: boolean;
  autobombs_qty?: number;
}

type IResponse = TaskCorrection;

@injectable()
class CorrectTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
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
    got_shell,
    autobombs_qty = 0,
  }: IRequest): Promise<IResponse> {
    const findTask = await this.tasksRepository.findById(task_id);

    if (!findTask) {
      throw new AppError("Tarefa não encontrada!", 404);
    }

    let computedCoins = coins;

    let taskValue = 0;

    let piranhaPlantId = "";
    let pipeId = "";
    let yoshiId = "";
    let bombId = "";
    let shellId = "";
    let mushroomUpId = "";
    let autoBombId = "";

    const appliedElements: string[] = [];

    findTask.task_elements.forEach((task_element) => {
      taskValue +=
        task_element.game_element.type === "REWARD" &&
        task_element.game_element.application === "FIXED_VALUE"
          ? task_element.quantity * task_element.game_element.value
          : 0;

      if (task_element.game_element.name === "piranha plant") {
        piranhaPlantId = task_element.game_element_id;
      }

      if (task_element.game_element.name === "pipe") {
        pipeId = task_element.game_element_id;
      }

      if (task_element.game_element.name === "mushroom up") {
        mushroomUpId = task_element.game_element_id;
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

      if (task_element.game_element.name === "auto bomb") {
        autoBombId = task_element.game_element_id;
      }
    });

    if (coins > taskValue) {
      throw new AppError(
        "Os pontos atribuidos ao estudante não podem ser maior que o valor da tarefa."
      );
    }

    const coinsAccuracy = (coins / taskValue) * 100;

    if (!!piranhaPlantId && !delivered_date && coins === 0) {
      computedCoins -= taskValue * 0.5;
      appliedElements.push(piranhaPlantId);
    }

    if (autoBombId) {
      computedCoins -= autobombs_qty * 2;
      appliedElements.push(autoBombId);
    }

    if (!!yoshiId && coinsAccuracy >= 80) {
      computedCoins -= taskValue * 0.5;
      appliedElements.push(yoshiId);
    }

    if (!!mushroomUpId && coinsAccuracy >= 80) {
      appliedElements.push(mushroomUpId);
    }

    if (
      !!pipeId &&
      differenceInDays(findTask.delivery_date, new Date(delivered_date)) >= 2
    ) {
      computedCoins += taskValue * 0.1;
      appliedElements.push(pipeId);
    }

    if (got_shell && !!shellId) {
      computedCoins -= 1;
      appliedElements.push(shellId);
    }

    if (!!bombId && coinsAccuracy < 30) {
      computedCoins -= taskValue * 0.3;
      appliedElements.push(bombId);
    }

    const newTaskCorrection = await this.tasksCorrectionsRepository.create({
      earned_coins: coins,
      computed_coins: computedCoins,
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
