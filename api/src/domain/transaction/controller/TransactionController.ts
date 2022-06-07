import { NextFunction, Request, Response } from "express"
import { PostgresOperationRepository } from "~/domain/operation/repository/PostgresOperationRepository"
import { FindOperationByType } from "~/domain/operation/useCase"
import { PostgresOwnerRepository } from "~/domain/owner/repository/PostgresOwnerRepository"
import { FindsertOwnerByName } from "~/domain/owner/useCase"
import { PostgresStoreRepository } from "~/domain/store/repository/PostgresStoreRepository"
import { FindsertStoreByName, UpdateStoreCash } from "~/domain/store/useCase"
import { PostgresTransactionRepository } from "../repository/PostgresTransactionRepository"
import { FindAllTransactions, FindTransactionById, ListTransactionsByStore, RemoveTransaction, SaveTransaction } from "../useCase"

export class TransactionController {
    private findAllTransactionsUseCase: FindAllTransactions
    private findTransactionByIdUseCase: FindTransactionById
    private findOperationByTypeUseCase: FindOperationByType
    private findsertOwnerByNameUseCase: FindsertOwnerByName
    private findsertStoreByNameUseCase: FindsertStoreByName
    private removeTransactionUseCase: RemoveTransaction
    private saveTransactionUseCase: SaveTransaction
    private updateStoreCashUseCase: UpdateStoreCash
    private listTransactionsByStoreUseCae: ListTransactionsByStore

    async all(request: Request, response: Response, next: NextFunction) {
        this.findAllTransactionsUseCase = new FindAllTransactions(new PostgresTransactionRepository())
        return this.findAllTransactionsUseCase.execute()
    }

    async listByStore(request: Request, response: Response, next: NextFunction) {
        this.listTransactionsByStoreUseCae = new ListTransactionsByStore(
            new PostgresTransactionRepository(),
            new PostgresStoreRepository(),
            new PostgresOperationRepository()
        )
        return this.listTransactionsByStoreUseCae.execute()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        this.findTransactionByIdUseCase = new FindTransactionById(new PostgresTransactionRepository(), request)
        return this.findTransactionByIdUseCase.execute()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.findsertOwnerByNameUseCase = new FindsertOwnerByName(new PostgresOwnerRepository(), request.body.owner)
        const owner = await this.findsertOwnerByNameUseCase.execute()

        this.findsertStoreByNameUseCase = new FindsertStoreByName(new PostgresStoreRepository(), request.body.store, owner.id)
        const store = await this.findsertStoreByNameUseCase.execute()
        
        this.findOperationByTypeUseCase = new FindOperationByType(new PostgresOperationRepository(), parseInt(request.body.operation_type))
        const operation = await this.findOperationByTypeUseCase.execute()

        if (operation) {
            this.saveTransactionUseCase = new SaveTransaction(new PostgresTransactionRepository(), request, { store_id: store.id })
            const transaction = await this.saveTransactionUseCase.execute()

            this.updateStoreCashUseCase = new UpdateStoreCash(new PostgresStoreRepository(), request, owner.id)
            await this.updateStoreCashUseCase.execute()

            return transaction
        }
        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        this.removeTransactionUseCase = new RemoveTransaction(new PostgresTransactionRepository(), request)
        return this.removeTransactionUseCase.execute()
    }

}