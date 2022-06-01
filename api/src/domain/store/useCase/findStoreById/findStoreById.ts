import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Stores } from "@entity/Stores"

export class FindStoreById {
  private storeRepository = AppDataSource.getRepository(Stores)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    const store = await this.storeRepository.findOne({ where: { id: this.request.params.id } })
    
    if (!store) {
      return {
        code: 404,
        entity: "Store",
        message: `Store with id ${this.request.params.id} not found.`
      }
    }

    return store  }

}