import { NextFunction, Request, Response } from "express"
import { PostgresOwnerRepository } from "../repository/PostgresOwnerRepository"
import { FindAllOwners, FindOwnerById, FindsertOwnerByName, RemoveOwner, SaveOwner } from "../useCase"

export class OwnerController {
    private findAllOwnersUseCase: FindAllOwners
    private findOwnerByIdUseCase: FindOwnerById
    private findsertOwnerByNameUseCase: FindsertOwnerByName
    private removeOwnerUseCase: RemoveOwner
    private saveOwnerUseCase: SaveOwner

    async all(request: Request, response: Response, next: NextFunction) {
        this.findAllOwnersUseCase = new FindAllOwners(new PostgresOwnerRepository)
        return this.findAllOwnersUseCase.execute()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        this.findOwnerByIdUseCase = new FindOwnerById(new PostgresOwnerRepository, request)
        return this.findOwnerByIdUseCase.execute()
    }

    async oneByName(request: Request, response: Response, next: NextFunction) {
        this.findsertOwnerByNameUseCase = new FindsertOwnerByName(new PostgresOwnerRepository, request.params.name)
        return this.findsertOwnerByNameUseCase.execute()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.saveOwnerUseCase = new SaveOwner(new PostgresOwnerRepository, request)
        return this.saveOwnerUseCase.execute()
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        this.removeOwnerUseCase = new RemoveOwner(new PostgresOwnerRepository, request)
        return this.removeOwnerUseCase.execute()
    }

}