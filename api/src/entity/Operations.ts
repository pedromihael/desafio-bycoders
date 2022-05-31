import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm"
import { Transactions } from "./Transactions";
import { v4 as uuid } from 'uuid'

export enum OperationSign {
    INCOME = '+',
    OUTCOME = '-'
}

@Entity('operations')
export class Operations {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    description: string

    @Column()
    type: number

    @Column()
    kind: string

    @Column({
        type: 'enum',
        enum: OperationSign
    })
    sign: OperationSign

    @OneToMany(type => Transactions, transaction => transaction.operation_id, { nullable: true }) transactions?: Transactions[];  

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

}
