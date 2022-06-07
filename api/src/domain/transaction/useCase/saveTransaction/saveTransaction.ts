import 'reflect-metadata';
import { Request } from 'express';
import { autoInjectable, inject } from "tsyringe"
import { ITransactionRepository } from "../../repository/ITransactionRepository"
import { Transactions } from '../../../../entity/Transactions';

export interface StoreIdentification {
  store_id: string;
}

@autoInjectable()
export class SaveTransaction {
  
  constructor(
    @inject('TransactionRepository') private transactionRepository: ITransactionRepository,
    request: Request | any,
    store: StoreIdentification
  ) {
    this.request = request
    this.store = store
  }
  
  private request: Request
  private store: StoreIdentification

  async execute(): Promise<Transactions | any> {
    try {
      const transaction: Transactions = this.request.body
      if (this.store) {
        const { store_id } = this.store
        const res = await this.transactionRepository.save({ ...transaction, store_id })
        return res
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