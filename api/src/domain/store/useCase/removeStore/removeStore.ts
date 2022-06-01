import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Stores } from "@entity/Stores"

export class RemoveStore {
  private storeRepository = AppDataSource.getRepository(Stores)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    const storeToRemove = await this.storeRepository.findOneBy({ id: this.request.params.id })
    if (storeToRemove) {
      try {
        const store = await this.storeRepository.remove(storeToRemove)
        if (!store) {
          return {
            code: 404,
            entity: "Store",
            message: `Store with id ${this.request.params.id} not removed.`
          }
        } return store
      } catch (error) {
        return error
      }
    } else return null
  }

}