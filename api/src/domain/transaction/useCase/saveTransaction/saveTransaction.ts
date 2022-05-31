import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Transactions } from "@entity/Transactions"

export class SaveTransaction {
  private transactionRepository = AppDataSource.getRepository(Transactions)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    return this.transactionRepository.save(this.request.body)
  }

}