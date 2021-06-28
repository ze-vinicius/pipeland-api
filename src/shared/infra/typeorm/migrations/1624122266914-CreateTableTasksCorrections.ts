import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTasksCorrections1624122266914
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks_corrections",
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
            name: "student_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "earned_coins",
            type: "int",
          },
          {
            name: "computed_coins",
            type: "int",
          },
          {
            name: "comment",
            type: "text",
          },
          {
            name: "delivered_date",
            type: "timestamp",
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
            name: "TaskCorrectionTask",
            columnNames: ["task_id"],
            referencedTableName: "tasks",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "TaskCorrectionStudent",
            columnNames: ["student_id"],
            referencedTableName: "students",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks_corrections");
  }
}
