import 'reflect-metadata';
import { autoInjectable, inject } from "tsyringe"
import { IStoreRepository } from "../../repository/IStoreRepository"
import { Request } from "express"
import { Stores } from '~/entity/Stores';

@autoInjectable()
export class FindStoreById {
  
  constructor(@inject('StoreRepository') private storeRepository: IStoreRepository, request: Request | any) {
    this.request = request
  }

  private request: Request

  async execute(): Promise<Stores | any> {
    const store = await this.storeRepository.findOneBy({ id: this.request.params.id })
    if (!store) {
      return {
        code: 404,
        entity: "Store",
        message: `Store with id ${this.request.params.id} not found.`
      }
    } return store
  }

}