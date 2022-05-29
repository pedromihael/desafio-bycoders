import { Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne, OneToMany } from "typeorm"
import { Owner } from "./Owner"
import { Transaction } from "./Transaction"

@Entity()
export class Store {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    cash: Double

    @ManyToOne(type => Owner, owner => owner.stores) owner_id: Owner; 

    @OneToMany(type => Transaction, transaction => transaction.store_id) transactions: Transaction[];  

}
