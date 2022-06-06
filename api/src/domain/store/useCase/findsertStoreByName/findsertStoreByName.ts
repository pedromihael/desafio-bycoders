import 'reflect-metadata';
import { autoInjectable, inject } from "tsyringe"
import { Stores } from '~/entity/Stores';
import { IStoreRepository } from "../../repository/IStoreRepository"

@autoInjectable()
export class FindsertStoreByName {

  constructor(@inject('StoreRepository') private storeRepository: IStoreRepository, name: string, owner_id: string) {
    this.name = name
    this.owner_id = owner_id
  }

  private name: string
  private owner_id: string

  async execute(): Promise<Stores | any> {
    try {
      let store = await this.storeRepository.findOneBy({ name: this.name })
      if (!store) {
        store = await this.storeRepository.save({ name: this.name, owner_id: this.owner_id })
      }
      return store
    } catch (error) {
      return {
        error,
        code: 404,
        entity: "Store",
        message: `Store with name ${this.name} not found.`
      }
    }
  }

}