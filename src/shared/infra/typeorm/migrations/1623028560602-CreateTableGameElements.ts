import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { v4 } from "uuid";

export default class CreateTableGameElements1623028560602
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "game_elements",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "image",
            type: "varchar",
          },
          {
            name: "value",
            type: "int",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "application",
            type: "varchar",
          },
          {
            name: "application_rule",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("game_elements")
      .values([
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
          description:
            "Retirar 50% do total da atividade em caso de não envio.",
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
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("game_elements");
  }
}
