import { NextFunction, Request, Response } from "express"
import { FindAllOperations, FindOperationById, FindOperationByType, RemoveOperation, SaveOperation } from "../useCase"

export class OperationController {
    private findAllOperationsUseCase: FindAllOperations
    private findOperationByIdUseCase: FindOperationById
    private findOperationByTypeUsecase : FindOperationByType
    private removeOperationUseCase: RemoveOperation
    private saveOperationUseCase: SaveOperation

    async all(request: Request, response: Response, next: NextFunction) {
        this.findAllOperationsUseCase = new FindAllOperations()
        return this.findAllOperationsUseCase.execute()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        this.findOperationByIdUseCase = new FindOperationById(request)
        return this.findOperationByIdUseCase.execute()
    }
    
    async oneByType(request: Request, response: Response, next: NextFunction) {
        this.findOperationByTypeUsecase = new FindOperationByType(request)
        return this.findOperationByTypeUsecase.execute()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.saveOperationUseCase = new SaveOperation(request)
        return this.saveOperationUseCase.execute()
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        this.removeOperationUseCase = new RemoveOperation(request)
        return this.removeOperationUseCase.execute()
    }

}