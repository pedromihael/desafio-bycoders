import { Transactions } from "~/entity/Transactions";

export interface ITransactionRepository {
  save: (transaction: Transactions) => Promise<Transactions> | null,
  find: () => Promise<Transactions[]> | null,
  findOneBy: (condition: Object) => Promise<Transactions> | null,
  remove: (transaction: Transactions) => Promise<Transactions> | null,
}