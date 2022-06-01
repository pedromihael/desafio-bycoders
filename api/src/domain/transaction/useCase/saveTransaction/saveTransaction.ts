import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Transactions } from "@entity/Transactions"
import { isInstanceOf } from "@shared/helper/instanceOf"
import { ITransactions } from "../../model/ITransactions"
import { keys } from 'ts-transformer-keys'

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
    try {
      const transaction: Transactions = this.request.body
      if (isInstanceOf(transaction, keys<ITransactions>()) && this.store) {
        const { store_id } = this.store
        return this.transactionRepository.save({ ...transaction, store_id })
      } else {
        return {
          code: 304,
          entity: "Transaction",
          message: `Transaction not created. Check the body request.`
        }
      }
    } catch (error) {
      return error
    }
  }

}