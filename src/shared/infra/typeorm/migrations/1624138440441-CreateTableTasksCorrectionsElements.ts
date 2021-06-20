import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTasksCorrectionsElements1624138440441
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks_corrections_elements",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "task_correction_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "game_element_id",
            type: "uuid",
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
        foreignKeys: [
          {
            name: "TaskCorrectionElementTaskCorrection",
            columnNames: ["task_correction_id"],
            referencedTableName: "tasks_corrections",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "TaskCorrectionGameElement",
            columnNames: ["game_element_id"],
            referencedTableName: "game_elements",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks_corrections_elements");
  }
}
