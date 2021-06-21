import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAttendances1624209387991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "attendances",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "class_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "student_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "is_present",
            type: "bool",
          },
          {
            name: "date",
            type: "timestamp",
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
            name: "AttendanceClass",
            columnNames: ["class_id"],
            referencedTableName: "classes",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "AttendanceStudent",
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
    await queryRunner.dropTable("attendances");
  }
}
