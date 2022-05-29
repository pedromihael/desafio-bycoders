import "reflect-metadata"
import { DataSource } from "typeorm"
import { Operation } from "@entity/Operation"
import { Owner } from "@entity/Owner"
import { Store } from "@entity/Store"
import { Transaction } from "@entity/Transaction"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "stores_transactions",
    synchronize: true,
    logging: false,
    entities: [Operation, Owner, Store, Transaction],
    migrations: [],
    subscribers: [],
})
