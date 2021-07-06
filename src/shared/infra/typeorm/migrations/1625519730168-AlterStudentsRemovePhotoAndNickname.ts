import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterStudentsRemovePhotoAndNickname1625519730168
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("students", [
      new TableColumn({
        name: "nickname",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "photo",
        type: "varchar",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("students", [
      new TableColumn({
        name: "nickname",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "photo",
        type: "varchar",
        isNullable: true,
      }),
    ]);
  }
}
