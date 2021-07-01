import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTasksCorrectionsComputedCoinsAndEarnedCoins1625101982023
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE tasks_corrections ALTER COLUMN computed_coins TYPE numeric(5,2)`
    );
    await queryRunner.query(
      `ALTER TABLE tasks_corrections ALTER COLUMN earned_coins TYPE numeric(5,2)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE tasks_corrections ALTER COLUMN computed_coins TYPE int`
    );
    await queryRunner.query(
      `ALTER TABLE tasks_corrections ALTER COLUMN earned_coins TYPE int`
    );
  }
}
