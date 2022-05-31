import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Stores } from "@entity/Stores"

export class FindAllStores {
  private storeRepository = AppDataSource.getRepository(Stores)

  async execute() {
    return this.storeRepository.find()
  }

}