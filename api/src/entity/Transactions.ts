import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { DecimalTransformer } from "../shared/helper/decimalTransformer";
import { Operations } from "./Operations";
import { Stores } from "./Stores";
import { v4 as uuid } from 'uuid';

@Entity('transactions')
export class Transactions {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: 'value',  type: 'decimal', scale: 2, default: 0.0, transformer: new DecimalTransformer()})
    value: number

    @Column()
    costumer_cpf: string

    @Column()
    costumer_card_number: string

    @Column()
    date: Date

    @Column()
    hour: Date

    @ManyToOne(type => Stores, store => store.transactions) store_id: Stores; 

    @ManyToOne(type => Operations, operation => operation.transactions) operation_id: Operations; 
    
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

}
