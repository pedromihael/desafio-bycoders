import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Transactions } from "@entity/Transactions"

export interface StoreIdentification {
  store_id: string;
}
export class SaveTransaction {
  private transactionRepository = AppDataSource.getRepository(Transactions)
  private request: Request
  private store: StoreIdentification

  constructor(request: Request, store: StoreIdentification) {
    this.request = request
    this.store = store
  }

  async execute() {
    const { store_id } = this.store
    return this.transactionRepository.save(
      { ...this.request.body, store_id }
    )
  }

}