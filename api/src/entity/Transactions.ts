import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { DecimalTransformer } from "../shared/helper/decimalTransformer";
import { Operations } from "./Operations";
import { Stores } from "./Stores";
import { v4 as uuid } from 'uuid';

@Entity('transactions')
export class Transactions {

    @PrimaryGeneratedColumn('uuid')
    id?: string

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

    @Column({ name: 'storeId', nullable: false, type: 'uuid' })
    store_id: string
    
    @Column({ name: 'operation_type', nullable: false, type: 'int' })
    operation_type: string

    @ManyToOne(type => Stores, store => store.transactions) store?: Stores; 
    
    @ManyToOne(type => Operations, operation => operation.transactions) operation?: Operations; 
    
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

}
