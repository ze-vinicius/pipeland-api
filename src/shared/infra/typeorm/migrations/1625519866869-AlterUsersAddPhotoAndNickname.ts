import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUsersAddPhotoAndNickname1625519866869
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
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
    await queryRunner.dropColumns("users", [
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
