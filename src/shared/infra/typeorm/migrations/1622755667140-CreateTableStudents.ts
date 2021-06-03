import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateTableStudents1622755667140
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "students",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "nickname",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "user_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "class_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "avatar_url",
            type: "varchar",
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("students");
  }
}
