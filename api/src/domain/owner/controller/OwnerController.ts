import { NextFunction, Request, Response } from "express"
import { FindAllOwners, FindOwnerById, RemoveOwner, SaveOwner } from "../useCase"

export class OwnerController {
    private findAllOwnersUseCase: FindAllOwners
    private findOwnerByIdUseCase: FindOwnerById
    private removeOwnerUseCase: RemoveOwner
    private saveOwnerUseCase: SaveOwner

    async all(request: Request, response: Response, next: NextFunction) {
        this.findAllOwnersUseCase = new FindAllOwners()
        return this.findAllOwnersUseCase.execute()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        this.findOwnerByIdUseCase = new FindOwnerById(request)
        return this.findOwnerByIdUseCase.execute()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.saveOwnerUseCase = new SaveOwner(request)
        return this.saveOwnerUseCase.execute()
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        this.removeOwnerUseCase = new RemoveOwner(request)
        return this.removeOwnerUseCase.execute()
    }

}