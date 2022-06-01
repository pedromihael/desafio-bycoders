import { Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne, OneToMany } from "typeorm"
import { DecimalTransformer } from "../shared/helper/decimalTransformer"
import { Owners } from "./Owners"
import { Transactions } from "./Transactions"
import { v4 as uuid } from 'uuid';

@Entity('stores')
export class Stores {

    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column({ nullable: false })
    name: string

    @Column({name: 'cash',  type: 'decimal', scale: 2, default: 0.0, transformer: new DecimalTransformer(), nullable: true})
    cash?: number

    @Column({ name:'ownerId', nullable: false, type: 'uuid' })
    owner_id: string

    @ManyToOne(type => Owners, owner => owner.stores, { nullable: false }) owner?: Owners; 

    @OneToMany(type => Transactions, transaction => transaction.store_id) transactions?: Transactions[]; 
    
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

}
