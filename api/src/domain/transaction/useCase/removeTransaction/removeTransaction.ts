import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Transactions } from "@entity/Transactions"

export class RemoveTransaction {
  private transactionRepository = AppDataSource.getRepository(Transactions)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    const transactionToRemove = await this.transactionRepository.findOneBy({ id: this.request.params.id })
    if (transactionToRemove) {
      try {
        const transaction = await this.transactionRepository.remove(transactionToRemove)
        if (!transaction) {
          return {
            code: 404,
            entity: "Transaction",
            message: `Transaction with id ${this.request.params.id} not removed.`
          }
        } return transaction
      } catch (error) {
        return error
      }
    } else return null
  }

}