import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm"
import { Transaction } from "./Transaction";

export enum OperationSign {
    INCOME = '+',
    OUTCOME = '-'
}

@Entity()
export class Operation {

    @PrimaryGeneratedColumn()
    id: number

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

    @OneToMany(type => Transaction, transaction => transaction.operation_id) transactions: Transaction[];  

}
