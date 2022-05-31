import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Owners } from "@entity/Owners"

export class FindAllOwners {
  private ownerRepository = AppDataSource.getRepository(Owners)

  async execute() {
    return this.ownerRepository.find()
  }

}