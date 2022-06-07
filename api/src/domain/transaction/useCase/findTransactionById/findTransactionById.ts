import 'reflect-metadata';
import { autoInjectable, inject } from "tsyringe"
import { ITransactionRepository } from "../../repository/ITransactionRepository"
import { Request } from "express"
import { Transactions } from '~/entity/Transactions';

@autoInjectable()
export class FindTransactionById {
  
  constructor(@inject('TransactionRepository') private transactionRepository: ITransactionRepository, request: Request | any) {
    this.request = request
  }

  private request: Request

  async execute(): Promise<Transactions | any> {
    const transaction = await this.transactionRepository.findOneBy({ id: this.request.params.id })
    if (!transaction) {
      return {
        code: 404,
        entity: "Transaction",
        message: `Transaction with id ${this.request.params.id} not found.`
      }
    } return transaction
  }

}