import 'reflect-metadata';
import { Request } from 'express';
import { autoInjectable, inject } from "tsyringe"
import { IStoreRepository } from "../../repository/IStoreRepository"
import { Stores } from '~/entity/Stores';

@autoInjectable()
export class SaveStore {
  
  constructor(@inject('StoreRepository') private storeRepository: IStoreRepository, request: Request | any) {
    this.request = request
  }
  
  private request: Request

  async execute(): Promise<Stores | any> {
    try {
      const store: Stores = this.request.body
      const result = await this.storeRepository.save(store)
      if (result.id) {
        return result
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