import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTestTable_20250506_0010 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "test",
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
                        isNullable: true,
                        default: "'content'"
                    },
                    {
                        name: "test",
                        type: "text",
                        isNullable: true,
                        default: "'test'"
                    },
                ]
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("test");
    }
}
