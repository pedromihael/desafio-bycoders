import { NextFunction, Request, Response } from "express"
import { PostgresStoreRepository } from "../repository/PostgresStoreRepository"
import { FindAllStores, FindsertStoreByName, FindStoreById, RemoveStore, SaveStore } from "../useCase"

export class StoreController {
    private findAllStoresUseCase: FindAllStores
    private findStoreByIdUseCase: FindStoreById
    private findsertStoreByNameUseCase: FindsertStoreByName 
    private removeStoreUseCase: RemoveStore
    private saveStoreUseCase: SaveStore

    async all(request: Request, response: Response, next: NextFunction) {
        this.findAllStoresUseCase = new FindAllStores(new PostgresStoreRepository())
        return this.findAllStoresUseCase.execute()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        this.findStoreByIdUseCase = new FindStoreById(new PostgresStoreRepository(), request)
        return this.findStoreByIdUseCase.execute()
    }

    async oneByName(request: Request, response: Response, next: NextFunction) {
        this.findsertStoreByNameUseCase = new FindsertStoreByName(new PostgresStoreRepository(), request.body.name, request.body.owner_id)
        return this.findsertStoreByNameUseCase.execute()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.saveStoreUseCase = new SaveStore(new PostgresStoreRepository(), request)
        return this.saveStoreUseCase.execute()
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        this.removeStoreUseCase = new RemoveStore(new PostgresStoreRepository(), request)
        return this.removeStoreUseCase.execute()
    }

}