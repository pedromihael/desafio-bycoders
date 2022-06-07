import 'reflect-metadata';
import { Request } from 'express';
import { autoInjectable, inject } from "tsyringe"
import { ITransactionRepository } from "../../repository/ITransactionRepository"
import { Transactions } from '~/entity/Transactions';

@autoInjectable()
export class RemoveTransaction {
  
  constructor(@inject('TransactionRepository') private transactionRepository: ITransactionRepository, request: Request | any) {
    this.request = request
  }
  
  private request: Request
  
  async execute(): Promise<Transactions | any> {
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