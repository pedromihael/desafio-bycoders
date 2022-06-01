import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Stores } from "./Stores";
import { v4 as uuid } from 'uuid';

@Entity('owners')
export class Owners {

    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    name: string
  
    @OneToMany(type => Stores, store => store.owner_id, { nullable: false }) stores?: Stores[];  

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

}
