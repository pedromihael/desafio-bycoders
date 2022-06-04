import { NextFunction, Request, Response } from "express"
import { PostgresOperationRepository } from "../repository/PostgresOperationRepository"
import { FindAllOperations, FindOperationById, FindOperationByType, RemoveOperation, SaveOperation } from "../useCase"

export class OperationController {
    private findAllOperationsUseCase: FindAllOperations
    private findOperationByIdUseCase: FindOperationById
    private findOperationByTypeUsecase : FindOperationByType
    private removeOperationUseCase: RemoveOperation
    private saveOperationUseCase: SaveOperation

    async all(request: Request, response: Response, next: NextFunction) {
        this.findAllOperationsUseCase = new FindAllOperations(new PostgresOperationRepository())
        return this.findAllOperationsUseCase.execute()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        this.findOperationByIdUseCase = new FindOperationById(new PostgresOperationRepository(), request)
        return this.findOperationByIdUseCase.execute()
    }
    
    async oneByType(request: Request, response: Response, next: NextFunction) {
        this.findOperationByTypeUsecase = new FindOperationByType(new PostgresOperationRepository(), parseInt(request.params.type))
        return this.findOperationByTypeUsecase.execute()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.saveOperationUseCase = new SaveOperation(new PostgresOperationRepository(), request)
        return this.saveOperationUseCase.execute()
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        this.removeOperationUseCase = new RemoveOperation(new PostgresOperationRepository(), request)
        return this.removeOperationUseCase.execute()
    }

}