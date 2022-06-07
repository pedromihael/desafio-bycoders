import 'reflect-metadata';
import { Transactions } from "@entity/Transactions"
import { autoInjectable, inject } from "tsyringe"
import { ITransactionRepository } from "../../repository/ITransactionRepository"

@autoInjectable()
export class FindAllTransactions {
  constructor(@inject('TransactionRepository') private transactionRepository: ITransactionRepository) {}

  async execute(): Promise<Transactions[]> | null {
    return this.transactionRepository.find()
  }

}