import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Store } from "@entity/Store"

export class SaveStore {
  private storeRepository = AppDataSource.getRepository(Store)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    return this.storeRepository.save(this.request.body)
  }

}