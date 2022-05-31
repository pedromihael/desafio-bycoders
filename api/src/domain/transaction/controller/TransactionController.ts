import { NextFunction, Request, Response } from "express"
import { FindAllTransactions, FindTransactionById, RemoveTransaction, SaveTransaction } from "../useCase"

export class TransactionController {
    private findAllTransactionsUseCase: FindAllTransactions
    private findTransactionByIdUseCase: FindTransactionById
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
        this.saveTransactionUseCase = new SaveTransaction(request)
        return this.saveTransactionUseCase.execute()
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        this.removeTransactionUseCase = new RemoveTransaction(request)
        return this.removeTransactionUseCase.execute()
    }

}