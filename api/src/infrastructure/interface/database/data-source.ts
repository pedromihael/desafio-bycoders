import "reflect-metadata"
import { DataSource } from "typeorm"
import { Operations } from "../../../entity/Operations"
import { Owners } from "../../../entity/Owners"
import { Stores } from "../../../entity/Stores"
import { Transactions } from "../../../entity/Transactions"
import path from 'path'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5442,
    username: "postgres",
    password: "postgres",
    database: "transactions_db",
    synchronize: true,
    logging: true,
    entities: [Operations, Owners, Stores, Transactions],
    migrations: [path.join(__dirname, "migration/*.ts")],
    migrationsTableName: "migrations",
    subscribers: [],
})
