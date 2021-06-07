import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTasksElements1623029666340
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks_elements",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "task_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "game_element_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "quantity",
            type: "int",
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
            name: "TaskElementTask",
            columnNames: ["task_id"],
            referencedTableName: "tasks",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "TaskGameElement",
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
    await queryRunner.dropTable("tasks_elements");
  }
}
