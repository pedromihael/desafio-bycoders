import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Owners } from "@entity/Owners"

export class FindsertOwnerByName {
  private ownerRepository = AppDataSource.getRepository(Owners)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    let owner = await this.ownerRepository.findOne({ where: { name: this.request.body.name } })

    if (!owner) {
      owner = await this.ownerRepository.save(this.request.body)
    }

    return owner
  }

}