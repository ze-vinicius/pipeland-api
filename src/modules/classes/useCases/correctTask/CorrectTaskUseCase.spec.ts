import { v4 } from "uuid";

import { TasksCorrectionsElementsRepositoryInMemory } from "@modules/classes/repositories/in-memory/TasksCorrectionsElementsRepositoryInMemory";
import { TasksCorrectionsRepositoryInMemory } from "@modules/classes/repositories/in-memory/TasksCorrectionsRepositoryInMemory";
import { TasksElementsRepositoryInMemory } from "@modules/classes/repositories/in-memory/TasksElementsRepositoryInMemory";
import { TasksRepositoryInMemory } from "@modules/classes/repositories/in-memory/TasksRepositoryInMemory";
import { ITasksCorrectionsElementsRepository } from "@modules/classes/repositories/ITasksCorrectionsElementsRepository";
import { ITasksCorrectionsRepository } from "@modules/classes/repositories/ITasksCorrectionsRepository";
import { ITasksElementsRepository } from "@modules/classes/repositories/ITasksElementsRepository";
import { ITasksRepository } from "@modules/classes/repositories/ITasksRepository";

import { CorrectTaskUseCase } from "./CorrectTaskUseCase";

let tasksRepositoryInMemory: ITasksRepository;
let tasksCorrectionsRepositoryInMemory: ITasksCorrectionsRepository;
let tasksCorrectionsElementsRepositoryInMemory: ITasksCorrectionsElementsRepository;
let tasksElementsRepository: ITasksElementsRepository;

let correctTaskUseCase: CorrectTaskUseCase;

const gameElements = [
  // REWARDS
  {
    id: v4(),
    name: "coin",
    description: "(X) Coins",
    image: "coin.png",
    value: 1,
    type: "REWARD",
    application: "FIXED_VALUE",
    application_rule: null,
  },
  {
    id: v4(),
    name: "cherry",
    description: "3 Coins",
    image: "cherry.png",
    value: 3,
    type: "REWARD",
    application: "PERCENTAGE_OFF_CHERRYS",
    application_rule: null,
  },
  {
    id: v4(),
    name: "pipe",
    description: "ganho de bônus por envio antecipado de atividade.",
    image: "pipe.png",
    value: 10,
    type: "REWARD",
    application: "EARLY_DELIVERY",
    application_rule: 2,
  },
  {
    id: v4(),
    name: "yoshi",
    description: "ganho de bônus por acerto de X% em atividades.",
    image: "yoshi.png",
    value: 10,
    type: "REWARD",
    application: "PERCENTAGE_OVER_TASK_VALUE",
    application_rule: 80,
  },
  {
    id: v4(),
    name: "red mushroom",
    description: "10 coins.",
    image: "red-mushroom.png",
    value: 10,
    type: "REWARD",
    application: "FIXED_VALUE",
    application_rule: null,
  },
  {
    id: v4(),
    name: "mid mushroom",
    description: "5 coins.",
    image: "mid-mushroom.png",
    value: 5,
    type: "REWARD",
    application: "FIXED_VALUE",
    application_rule: null,
  },
  {
    id: v4(),
    name: "strawberry",
    description: "2 coins.",
    image: "strawberry.png",
    value: 2,
    type: "REWARD",
    application: "FIXED_VALUE",
    application_rule: null,
  },
  {
    id: v4(),
    name: "mushroom up",
    description:
      "Anula ação provocada por Piranha Plant, AutoBomb e Bomb em uma atividade e da Bullet. Sendo um (1) Mushroom para cada elemento na ocorrência de mais de um na mesma atividade.",
    image: "mushroom-up.png",
    value: 2,
    type: "REWARD",
    application: "TASK_ACCURACY",
    application_rule: 80,
  },
  {
    id: v4(),
    name: "star",
    description: "30 coins.",
    image: "star.png",
    value: 30,
    type: "REWARD",
    application: "FIXED_VALUE",
    application_rule: null,
  },
  {
    id: v4(),
    name: "auto bomb",
    description:
      "Perda de Coins por não atendimento de requisito da atividade.",
    image: "auto-bomb.png",
    value: 2,
    type: "PENALTY",
    application: "FIXED_VALUE",
    application_rule: null,
  },
  {
    id: v4(),
    name: "bomb",
    description:
      "Para as atividades pode ser atribuído um percentual mínimo de acerto, caso o aluno não atinja o mínimo definido na Bomb, ele perde os Coins do percentual.",
    image: "bomb.png",
    value: 30,
    type: "PENALTY",
    application: "PERCENTAGE_OVER_TASK_VALUE",
    application_rule: 30,
  },
  {
    id: v4(),
    name: "piranha plant",
    description: "Retirar 50% do total da atividade em caso de não envio.",
    image: "piranha-plant.png",
    value: 50,
    type: "PENALTY",
    application: "PERCENTAGE_OVER_TASK_VALUE",
    application_rule: null,
  },
  {
    id: v4(),
    name: "shell",
    description:
      "Retira 1 Coin caso envie exercício em branco em atividade que a Piranha Plant esteja presente.",
    image: "shell.png",
    value: 1,
    type: "PENALTY",
    application: "FIXED_VALUE",
    application_rule: null,
  },
];

describe("CorrectTaskUseCase", () => {
  beforeEach(() => {
    tasksRepositoryInMemory = new TasksRepositoryInMemory();
    tasksCorrectionsRepositoryInMemory = new TasksCorrectionsRepositoryInMemory();
    tasksCorrectionsElementsRepositoryInMemory = new TasksCorrectionsElementsRepositoryInMemory();
    tasksElementsRepository = new TasksElementsRepositoryInMemory();

    correctTaskUseCase = new CorrectTaskUseCase(
      tasksRepositoryInMemory,
      tasksCorrectionsRepositoryInMemory,
      tasksCorrectionsElementsRepositoryInMemory
    );
  });

  it("should be able to correct a task", async () => {
    const createdTask = await tasksRepositoryInMemory.create({
      title: "Task Test",
      delivery_date: new Date(2021, 6, 30, 0, 0, 0),
      description: "Task description",
      class_id: "class-id",
    });

    tasksElementsRepository.bulkCreate([
      {
        game_element_id: gameElements[0].id,
        quantity: 1,
        task_id: createdTask.id,
      },
      {
        game_element_id: gameElements[1].id,
        quantity: 1,
        task_id: createdTask.id,
      },
    ]);

    const createdTaskCorrection = await correctTaskUseCase.execute({
      coins: 3,
      comment: "Comentário",
      delivered_date: new Date(2021, 6, 29, 14, 35, 0).toString(),
      got_shell: false,
      student_id: "1",
      task_id: createdTask.id,
    });

    expect(createdTaskCorrection.computed_coins).toBe(3);
  });
});
