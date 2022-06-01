import { NextFunction, Request, Response } from "express"
import { FindAllOwners, FindOwnerById, FindsertOwnerByName, RemoveOwner, SaveOwner } from "../useCase"

export class OwnerController {
    private findAllOwnersUseCase: FindAllOwners
    private findOwnerByIdUseCase: FindOwnerById
    private findsertOwnerByNameUseCase: FindsertOwnerByName
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

    async oneByName(request: Request, response: Response, next: NextFunction) {
        this.findsertOwnerByNameUseCase = new FindsertOwnerByName(request)
        return this.findsertOwnerByNameUseCase.execute()
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