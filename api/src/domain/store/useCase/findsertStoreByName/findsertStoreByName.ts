import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Stores } from "@entity/Stores"

export class FindsertStoreByName {
  private storeRepository = AppDataSource.getRepository(Stores)
  private name: string
  private owner_id: string

  constructor(name: string, owner_id: string) {
    this.name = name
    this.owner_id = owner_id
  }

  async execute() {
    if (!this.name || !this.owner_id) {
      return {
        code: 304,
        entity: "Store",
        message: `Store not created. Check the body request.`
      }
    }
    let store = await this.storeRepository.findOne({ where: { name: this.name } })

    if (!store) {
      store = await this.storeRepository.save({ name: this.name })
    }

    return store
  }

}