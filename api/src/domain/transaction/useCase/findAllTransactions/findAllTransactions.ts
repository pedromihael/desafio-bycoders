import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Transactions } from "@entity/Transactions"

export class FindAllTransactions {
  private transactionRepository = AppDataSource.getRepository(Transactions)

  async execute() {
    return this.transactionRepository.find()
  }

}