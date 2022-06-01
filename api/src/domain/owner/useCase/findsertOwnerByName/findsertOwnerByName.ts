import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Owners } from "@entity/Owners"

export class FindsertOwnerByName {
  private ownerRepository = AppDataSource.getRepository(Owners)
  private name: string

  constructor(name: string) {
    this.name = name
  }

  async execute() {
    let owner = await this.ownerRepository.findOne({ where: { name: this.name } })

    if (!owner) {
      owner = await this.ownerRepository.save({ name: this.name })
    }

    return owner
  }

}