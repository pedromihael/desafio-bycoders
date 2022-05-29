import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Store } from "@entity/Store"

export class FindAllStores {
  private storeRepository = AppDataSource.getRepository(Store)

  async execute() {
    return this.storeRepository.find()
  }

}