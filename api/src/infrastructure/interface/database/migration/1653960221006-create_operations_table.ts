import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createOperationsTable1653960221006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "operations",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "sign",
                        type: "enum",
                        enum: ["+", "-"],                    },
                    {
                        name: "kind",
                        type: "varchar",
                    },
                    {
                        name: "type",
                        type: "int",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("operations")
    }

}
