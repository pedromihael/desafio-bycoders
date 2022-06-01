import { NextFunction, Request, Response } from "express"
import { FindOperationByType } from "~/domain/operation/useCase"
import { FindsertOwnerByName } from "~/domain/owner/useCase"
import { FindsertStoreByName } from "~/domain/store/useCase"
import { FindAllTransactions, FindTransactionById, RemoveTransaction, SaveTransaction } from "../useCase"

export class TransactionController {
    private findAllTransactionsUseCase: FindAllTransactions
    private findTransactionByIdUseCase: FindTransactionById
    private findOperationByTypeUseCase: FindOperationByType
    private findsertOwnerByNameUseCase: FindsertOwnerByName
    private findsertStoreByNameUseCase: FindsertStoreByName
    private removeTransactionUseCase: RemoveTransaction
    private saveTransactionUseCase: SaveTransaction

    async all(request: Request, response: Response, next: NextFunction) {
        this.findAllTransactionsUseCase = new FindAllTransactions()
        return this.findAllTransactionsUseCase.execute()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        this.findTransactionByIdUseCase = new FindTransactionById(request)
        return this.findTransactionByIdUseCase.execute()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.findsertOwnerByNameUseCase = new FindsertOwnerByName(request.body.owner) // TODO: DTO aqui?
        const owner = await this.findsertOwnerByNameUseCase.execute()

        this.findsertStoreByNameUseCase = new FindsertStoreByName(request.body.store, owner.id)
        const store = await this.findsertStoreByNameUseCase.execute()
        
        this.findOperationByTypeUseCase = new FindOperationByType(parseInt(request.body.type))
        const operation = await this.findOperationByTypeUseCase.execute()

        if (!operation) {
            return {
                error: 'OperationNotFound'
            }
        }
        
        this.saveTransactionUseCase = new SaveTransaction(request, { store_id: store.id })
        return this.saveTransactionUseCase.execute()
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        this.removeTransactionUseCase = new RemoveTransaction(request)
        return this.removeTransactionUseCase.execute()
    }

}