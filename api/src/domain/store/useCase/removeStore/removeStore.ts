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
        return this.storeRepository.remove(storeToRemove)
      } catch (error) {
        return error
      }
    } else return null
  }

}