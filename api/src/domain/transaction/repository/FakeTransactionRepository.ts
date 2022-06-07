import { Transactions } from "~/entity/Transactions";
import { ITransactionRepository } from "./ITransactionRepository";

export class FakeTransactionRepository implements ITransactionRepository {

  private transactionrepository = []

  async save(transaction: Transactions): Promise<Transactions> {
    this.transactionrepository.push(transaction)
    return new Promise((res, rej) => {
      res(transaction)
    })
  }

  async find(): Promise<Transactions[]> {
    return new Promise((res, rej) => {
      res(this.transactionrepository)
    })
  }

  async findOneBy(condition: Object): Promise<Transactions> {
    return new Promise((res, rej) => {
      const found = this.transactionrepository.find(o =>
        o[Object.keys(condition)[0]] === condition[Object.keys(condition)[0]])
      res(found) 
    })
  }

  async remove(transaction: Transactions): Promise<Transactions> {
    return new Promise((res, rej) => {
      const found = this.transactionrepository.find(o =>
        o.id === transaction.id)
      
      const removed = this.transactionrepository.filter(o =>
        o.id !== transaction.id)
      
      this.transactionrepository = removed
      
      res(found)
    })
  }

}