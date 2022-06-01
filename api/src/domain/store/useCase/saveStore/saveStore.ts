import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Stores } from "@entity/Stores"
import { isInstanceOf } from "@shared/helper/instanceOf"
import { IStores } from "../../model/IStore"
import { keys } from 'ts-transformer-keys'

export class SaveStore {
  private storeRepository = AppDataSource.getRepository(Stores)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    try {
      const store: Stores = this.request.body
      if (isInstanceOf(store, keys<IStores>())) {
        return this.storeRepository.save(store)
      } else {
        return {
          code: 304,
          entity: "Store",
          message: `Store not created. Check the body request.`
        }
      }
    } catch (error) {
      return error
    }
  }

}