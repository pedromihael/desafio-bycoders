import 'reflect-metadata';
import { Request } from 'express';
import { autoInjectable, inject } from "tsyringe"
import { IStoreRepository } from "../../repository/IStoreRepository"
import { Stores } from '~/entity/Stores';

@autoInjectable()
export class RemoveStore {
  
  constructor(@inject('StoreRepository') private storeRepository: IStoreRepository, request: Request | any) {
    this.request = request
  }
  
  private request: Request
  
  async execute(): Promise<Stores | any> {
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