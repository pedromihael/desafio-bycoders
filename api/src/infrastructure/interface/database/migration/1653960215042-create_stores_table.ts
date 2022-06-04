import { MigrationInterface, QueryRunner, TableForeignKey, Table } from "typeorm"

export class createStoresTable1653960215042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "stores",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "owner_id",
                        type: "uuid",
                    },
                    {
                        name: "cash",
                        type: "float",
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'stores',
            new TableForeignKey({
                columnNames: ['owner_id'],
                referencedTableName: 'owners',
                referencedColumnNames: ['id'],
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stores', 'owner_id')
        await queryRunner.dropTable('stores')
    }

}
