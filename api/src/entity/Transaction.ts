import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Double } from "typeorm"
import { Operation } from "./Operation";
import { Store } from "./Store";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value: Double

    @Column()
    costumer_cpf: string

    @Column()
    costumer_card_number: string

    @Column()
    date: Date

    @Column()
    hour: Date

    @ManyToOne(type => Store, store => store.transactions) store_id: Store; 

    @ManyToOne(type => Operation, operation => operation.transactions) operation_id: Operation; 

}
