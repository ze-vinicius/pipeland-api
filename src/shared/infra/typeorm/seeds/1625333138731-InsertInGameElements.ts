import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 } from "uuid";

export class InsertInGameElements1625333138731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("game_elements")
      .values([
        {
          id: v4(),
          name: "attendance",
          description:
            "Representa a sua presença em sala de aula, vale 1 coin.",
          image: "attendance-anchor.png",
          value: 1,
          type: "REWARD",
          application: "FIXED_VALUE",
          application_rule: null,
        },
        {
          id: v4(),
          name: "bullet",
          description: "A cada 4 ausências do discente perde de 5 Coins.",
          image: "bullet.png",
          value: 5,
          type: "PENALTY",
          application: "FIXED_VALUE",
          application_rule: 4,
        },
      ])
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .update("game_elements")
      .set({
        value: 1,
      })
      .where("name = :name", { name: "auto bomb" })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("game_elements")
      .where("name = :name", { name: "attendance" })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .update("game_elements")
      .set({
        value: 2,
      })
      .where("name = :name", { name: "auto bomb" })
      .execute();
  }
}
