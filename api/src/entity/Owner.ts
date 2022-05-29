import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Store } from "./Store";

@Entity()
export class Owner {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
  
    @OneToMany(type => Store, store => store.owner_id) stores: Store[];  

}
