import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Transactions } from "@entity/Transactions"

export class FindTransactionById {
  private transactionRepository = AppDataSource.getRepository(Transactions)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    const transaction = await this.transactionRepository.findOne({ where: { id: this.request.params.id } })
    
    if (!transaction) {
      return {
        code: 404,
        entity: "Transaction",
        message: `Transaction with id ${this.request.params.id} not found.`
      }
    }

    return transaction
  }

}