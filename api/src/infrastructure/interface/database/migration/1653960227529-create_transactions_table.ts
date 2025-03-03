import { MigrationInterface, QueryRunner, TableForeignKey, Table } from "typeorm"

export class createTransactionsTable1653960227529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "operation_type",
                        type: "int",
                    },
                    {
                        name: "store_id",
                        type: "uuid",
                    },
                    {
                        name: "value",
                        type: "decimal",
                    },
                    {
                        name: "customer_cpf",
                        type: "varchar",
                    },
                    {
                        name: "customer_card",
                        type: "varchar",
                    },
                    {
                        name: "date",
                        type: "date",
                    },
                    {
                        name: "hour",
                        type: "date",
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['store_id'],
                referencedTableName: 'stores',
                referencedColumnNames: ['id'],
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        )

        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['operation_type'],
                referencedTableName: 'operations',
                referencedColumnNames: ['type'],
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'store_id')
        await queryRunner.dropForeignKey('transactions', 'operation_type')
        await queryRunner.dropTable('transactions')
    }

}
