import { Transactions } from "~/entity/Transactions";
import { AppDataSource } from "~/infrastructure/interface/database/data-source";
import { ITransactionRepository } from "./ITransactionRepository";

export class PostgresTransactionRepository implements ITransactionRepository {

  private transactionRepository = AppDataSource.getRepository(Transactions)

  async save(transaction: Transactions): Promise<Transactions> {
    return this.transactionRepository.save(transaction)
  }

  async find(): Promise<Transactions[]> {
    return this.transactionRepository.find()
  }

  async findOneBy(condition: Object): Promise<Transactions> {
    return this.transactionRepository.findOneBy(condition)
  }

  async remove(transaction: Transactions): Promise<Transactions> {
    return this.transactionRepository.findOneBy(transaction)
  }

}