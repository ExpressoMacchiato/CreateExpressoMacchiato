import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSalesDataTable_20250503_0012 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.createSchema("charts", true);

        await queryRunner.createTable(
            new Table({
                name: "sales_data",
                // schema: "charts",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "product",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "sales_date",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "units_sold",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "price",
                        type: "float",
                        isNullable: false
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sales_data");
    }
}
