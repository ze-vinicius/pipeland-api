import { isAfter } from "date-fns";

import { TaskElement } from "@modules/classes/infra/typeorm/entities/TaskElement";

type MarioAvatar = "mario" | "superMario" | "fireMario" | "capeMario";

export enum RESPONSE_ERRORS {
  NOT_AUTHORIZED = "Você não tem autorização para fazer isso",
  NOT_AUTHENTICATED = "Usuário não autenticado",
  CLASS_NOT_FOUND = "Turma não encontrada",
  TASK_NOT_FOUND = "Tarefa não enconrtada",
  TOKEN_NOT_FOUND = "Token não encontrado",
  INVALID_CREDENTIALS = "E-mail ou senha incorretos",
}

export const utils = {
  getTaskStatus(delivery_date: Date): "CLOSED" | "OPEN" {
    return isAfter(new Date(), delivery_date) ? "CLOSED" : "OPEN";
  },

  getStudentCurrentAvatar(coins: number): MarioAvatar {
    if (coins > 100 && coins <= 130) return "superMario";
    if (coins > 130 && coins <= 170) return "fireMario";
    if (coins >= 170) return "capeMario";

    return "mario";
  },

  getTaskValue(taskElements: TaskElement[]): number {
    return taskElements.reduce((acc, curr) => {
      if (
        curr.game_element.type === "REWARD" &&
        curr.game_element.application === "FIXED_VALUE"
      ) {
        return acc + curr.game_element.value;
      }

      return acc;
    }, 0);
  },
};
