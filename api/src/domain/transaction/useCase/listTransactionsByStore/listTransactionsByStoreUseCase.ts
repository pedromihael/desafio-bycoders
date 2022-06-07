import { autoInjectable, inject } from "tsyringe"
import { ITransactionRepository } from "../../repository/ITransactionRepository"
import { IStoreRepository } from "../../../store/repository/IStoreRepository"
import { IOperationRepository } from "../../../operation/repository/IOperationRepository"

@autoInjectable()
export class ListTransactionsByStore {
  constructor(
    @inject('TransactionRepository') private transactionRepository: ITransactionRepository,
    @inject('StoreRepository') private storeRepository: IStoreRepository,
    @inject('OperationRepository') private operationRepository: IOperationRepository
  ) { }

  async execute() {
    const transactions = await this.transactionRepository.find()
    const stores = await this.storeRepository.find()
    const operations = await this.operationRepository.find()
    
    const enhancedTransactions = transactions.map(t => {
      const store = stores.find(s => s.id == t.store_id)
      const storeName = store.name
      const storeCash = store.cash
      const operation = operations.find(o => o.type == t.operation_type)
      const operationKind = operation.kind
      const operationDescription = operation.description
      const operationSign = operation.sign

      return {
        ...t,
        storeName,
        storeCash,
        operationKind,
        operationDescription,
        operationSign
      }
    })
    
    let grouped = []
    
    for (const e of enhancedTransactions) {
      const found = grouped.find(g => g.storeName === e.storeName)
      if (found) {
        const groupedWithoutFound = grouped.filter(g => g.storeName !== found.storeName)
        const operations = found.operations
        const newfound = {
          ...found, operations: [...operations, {
            operationKind: e.operationKind,
            operationDescription: e.operationDescription,
            operationSign: e.operationSign,
            transactionValue: e.value
          }], 
        }
        grouped = groupedWithoutFound
        grouped.push(newfound)
      } else {
        grouped.push({
          storeName: e.storeName,
          cash: e.storeCash,
          operations: [{
            transactionValue: e.value,
            operationKind: e.operationKind,
            operationDescription: e.operationDescription,
            operationSign: e.operationSign,
          }]
        })
      }
    }

    return grouped
  }

}