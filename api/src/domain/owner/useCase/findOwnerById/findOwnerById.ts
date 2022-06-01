import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Owners } from "@entity/Owners"

export class FindOwnerById {
  private ownerRepository = AppDataSource.getRepository(Owners)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    const owner = await this.ownerRepository.findOne({ where: { id: this.request.params.id } })
    
    if (!owner) {
      return {
        code: 404,
        entity: "Owner",
        message: `Owner with id ${this.request.params.id} not found.`
      }
    }

    return owner
  }

}