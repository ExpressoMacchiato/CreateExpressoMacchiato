import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTableMigration_20250503_0010 implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.createSchema("identity", true); // crea lo schema se non esiste

        await queryRunner.createTable(
            new Table({
                name: "User",
                // schema: "identity",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "name",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "text",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "text",
                        isNullable: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropTable("identity.User");
        // await queryRunner.dropSchema("identity", true);
        await queryRunner.dropTable("User");
    }
}
