import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateNoteTable_20250503_0011 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Note",
                // schema: "identity",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "content",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "user_id",
                        type: "text",
                        isNullable: false
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "Note",
            new TableForeignKey({
                columnNames: ["user_id"],
                // referencedSchema: "identity",
                referencedTableName: "User",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Note");
    }
}
