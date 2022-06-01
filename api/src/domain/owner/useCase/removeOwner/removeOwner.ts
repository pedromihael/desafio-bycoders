import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Owners } from "@entity/Owners"

export class RemoveOwner {
  private ownerRepository = AppDataSource.getRepository(Owners)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    const ownerToRemove = await this.ownerRepository.findOneBy({ id: this.request.params.id })
    if (ownerToRemove) {
      try {
        const owner = await this.ownerRepository.remove(ownerToRemove)
        if (!owner) {
          return {
            code: 404,
            entity: "Owner",
            message: `Owner with id ${this.request.params.id} not removed.`
          }
        } return owner
      } catch (error) {
        return error
      }
    } else return null
  }

}