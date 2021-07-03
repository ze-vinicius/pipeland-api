import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTasksAddColumnStartDate1625324510717
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "tasks",
      new TableColumn({
        name: "start_date",
        type: "timestamp",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("tasks", "start_date");
  }
}
