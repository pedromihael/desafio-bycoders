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
    return this.storeRepository.findOne({where: {id: this.request.params.id}})
  }

}